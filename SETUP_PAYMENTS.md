# Payments & Orders — Setup Guide

Everything is wired. To go **live with online payments**, you only need to add
your Razorpay keys. Until then, **Pay on Delivery already works** and every
order is saved.

---

## What's already built

**Backend** (`backend/`)
- `POST /api/payment/create-order` — creates a Razorpay order
- `POST /api/payment/verify` — verifies the payment signature, saves the paid order
- `POST /api/order` — saves a COD / generic order
- `GET  /api/order?email=<email>` — a customer's orders
- `GET  /api/order/:orderId` — one order
- `PATCH /api/order/:orderId/status` — update status (Processing/Shipped/Delivered/Cancelled)
- MongoDB `Order` model with items, address, amounts, payment + status

**Frontend**
- `/checkout` — address → review → payment (Razorpay or Pay on Delivery)
- `/order-success/:id` — confirmation
- Dashboard → Order history
- Razorpay opens UPI / Cards / Netbanking

---

## To go live (what you provide)

### 1. Razorpay keys
Razorpay Dashboard → **Settings → API Keys** → Generate.
You get a **Key ID** (`rzp_test_...` or `rzp_live_...`) and a **Key Secret**.

### 2. Add them to the backend `.env`
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
```
(On Render: Dashboard → your service → **Environment** → add both vars.)

### 3. Redeploy the backend
- `npm install` already added `razorpay`.
- Render auto-deploys on git push, or hit **Manual Deploy**.

### 4. (Optional) Frontend env
Backend returns the public key automatically, so nothing is required.
If you want a fallback, set `VITE_RAZORPAY_KEY_ID` in the frontend `.env`.

---

## Test it
1. Use `rzp_test_...` keys.
2. Checkout → "Pay online".
3. Use a Razorpay **test card**: `4111 1111 1111 1111`, any future expiry, any CVV.
4. Order should appear in MongoDB and on the success page.

When ready for real money, swap to `rzp_live_...` keys (after Razorpay KYC).

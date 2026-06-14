import { API_BASE } from "../api";

// Public key id (optional — backend also returns it). Set VITE_RAZORPAY_KEY_ID if you like.
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

/* Secure flow:
   1) backend creates a Razorpay order
   2) open checkout with that order_id
   3) backend verifies the signature + saves the paid order
   resolves with the saved orderId. */
export async function payWithRazorpay(orderData) {
  const r = await fetch(`${API_BASE}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: orderData.total }),
  });
  const data = await r.json();
  if (!r.ok || !data.order) {
    throw new Error(data.error || "Online payment isn't set up yet.");
  }

  const ok = await loadRazorpay();
  if (!ok) throw new Error("Razorpay failed to load. Check your connection.");

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: data.key || RAZORPAY_KEY,
      order_id: data.order.id,
      amount: data.order.amount,
      currency: "INR",
      name: "Noted by 4 Knotts",
      description: "Order payment",
      prefill: {
        name: orderData.address?.name,
        email: orderData.address?.email,
        contact: orderData.address?.phone,
      },
      theme: { color: "#2C2E6B" },
      handler: async (resp) => {
        try {
          const v = await fetch(`${API_BASE}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...resp, orderData }),
          });
          const vd = await v.json();
          if (vd.success) resolve(vd.orderId);
          else reject(new Error(vd.error || "Payment verification failed"));
        } catch (e) {
          reject(e);
        }
      },
      modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
    });
    rzp.on("payment.failed", (res) =>
      reject(new Error(res.error?.description || "Payment failed"))
    );
    rzp.open();
  });
}

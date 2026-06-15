import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE } from "../api";

const TABS = [
  { key: "orders", label: "Orders" },
  { key: "users", label: "Users" },
  { key: "reviews", label: "Reviews" },
  { key: "custom", label: "Custom Requests" },
  { key: "bulk", label: "Bulk Enquiries" },
];

const ENDPOINTS = {
  orders: "/api/order",
  users: "/api/users",
  reviews: "/api/reviews/all",
  custom: "/api/custom-requests",
  bulk: "/api/wholesale",
};

const PICK = {
  orders: "orders",
  users: "users",
  reviews: "reviews",
  custom: "requests",
  bulk: "enquiries",
};

export default function Admin() {
  const [tab, setTab] = useState("orders");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async (which = tab) => {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(`${API_BASE}${ENDPOINTS[which]}`);
      const d = await r.json();
      setRows(d[PICK[which]] || []);
    } catch (e) {
      setErr(e.message);
      setRows([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(tab); /* eslint-disable-next-line */ }, [tab]);

  const approveReview = async (id, approved) => {
    await fetch(`${API_BASE}/api/reviews/${id}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    load();
  };
  const delReview = async (id) => {
    if (!confirm("Delete this review?")) return;
    await fetch(`${API_BASE}/api/reviews/${id}`, { method: "DELETE" });
    load();
  };
  const updateOrderStatus = async (orderId, status) => {
    await fetch(`${API_BASE}/api/order/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };
  const updateBulkStatus = async (id, status) => {
    await fetch(`${API_BASE}/api/wholesale/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };
  const updateCustomStatus = async (id, status) => {
    await fetch(`${API_BASE}/api/custom-requests/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <>
      <Navbar />
      <section style={S.page}>
        <h1 style={S.h1}>Admin Dashboard</h1>
        <p style={S.sub}>All records across NOTED by 4 Knotts</p>

        <div style={S.tabs}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{ ...S.tab, ...(tab === t.key ? S.tabOn : {}) }}
            >
              {t.label}
            </button>
          ))}
          <button onClick={() => load()} style={S.refresh}>↻ Refresh</button>
        </div>

        <div style={S.card}>
          {loading && <p style={S.meta}>Loading…</p>}
          {err && <p style={{ color: "#b23b4b" }}>{err}</p>}
          {!loading && rows.length === 0 && <p style={S.meta}>No records yet.</p>}

          {!loading && rows.length > 0 && (
            <div style={{ overflowX: "auto" }}>
              {tab === "orders" && (
                <Table cols={["Order ID", "Customer", "Amount", "Payment", "Status", "Date", ""]}>
                  {rows.map((o) => (
                    <tr key={o._id} style={S.tr}>
                      <td style={S.td}><b>{o.orderId}</b></td>
                      <td style={S.td}>{o.name}<br /><small style={S.meta}>{o.email}</small></td>
                      <td style={S.td}>₹{o.total}</td>
                      <td style={S.td}>{o.payment?.method}<br /><small style={S.meta}>{o.payment?.status}</small></td>
                      <td style={S.td}>
                        <select value={o.status} onChange={(e) => updateOrderStatus(o.orderId, e.target.value)} style={S.select}>
                          {["Processing", "Shipped", "Delivered", "Cancelled"].map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={S.td}>{fmt(o.createdAt)}</td>
                      <td style={S.td}><small style={S.meta}>{o.items?.length || 0} items</small></td>
                    </tr>
                  ))}
                </Table>
              )}

              {tab === "users" && (
                <Table cols={["Name", "Email", "Role", "Joined"]}>
                  {rows.map((u) => (
                    <tr key={u._id} style={S.tr}>
                      <td style={S.td}>{u.name || "—"}</td>
                      <td style={S.td}>{u.email}</td>
                      <td style={S.td}><span style={S.pill}>{u.role}</span></td>
                      <td style={S.td}>{fmt(u.createdAt)}</td>
                    </tr>
                  ))}
                </Table>
              )}

              {tab === "reviews" && (
                <Table cols={["Name", "Rating", "Review", "Approved", "Date", "Action"]}>
                  {rows.map((r) => (
                    <tr key={r._id} style={S.tr}>
                      <td style={S.td}>{r.name}</td>
                      <td style={S.td}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                      <td style={{ ...S.td, maxWidth: 320 }}>{r.review}</td>
                      <td style={S.td}>
                        <input type="checkbox" checked={!!r.approved} onChange={(e) => approveReview(r._id, e.target.checked)} />
                      </td>
                      <td style={S.td}>{fmt(r.createdAt)}</td>
                      <td style={S.td}><button onClick={() => delReview(r._id)} style={S.del}>Delete</button></td>
                    </tr>
                  ))}
                </Table>
              )}

              {tab === "custom" && (
                <Table cols={["Name", "Contact", "Spec", "Design", "Price", "Status", "Date"]}>
                  {rows.map((c) => (
                    <tr key={c._id} style={S.tr}>
                      <td style={S.td}>{c.name || "—"}<br /><small style={S.meta}>{c.coverText}</small></td>
                      <td style={S.td}>{c.email}<br /><small style={S.meta}>{c.phone}</small></td>
                      <td style={S.td}>{c.size} · {c.pages}p · {c.binding}</td>
                      <td style={{ ...S.td, maxWidth: 180, wordBreak: "break-all" }}>{c.uploadedDesign || "—"}</td>
                      <td style={S.td}>₹{c.price || 0}</td>
                      <td style={S.td}>
                        <select value={c.status} onChange={(e) => updateCustomStatus(c._id, e.target.value)} style={S.select}>
                          {["new", "in-progress", "done"].map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={S.td}>{fmt(c.createdAt)}</td>
                    </tr>
                  ))}
                </Table>
              )}

              {tab === "bulk" && (
                <Table cols={["Name", "Company", "Contact", "Product", "Qty", "Requirement", "Status", "Date"]}>
                  {rows.map((b) => (
                    <tr key={b._id} style={S.tr}>
                      <td style={S.td}>{b.name}</td>
                      <td style={S.td}>{b.company || "—"}</td>
                      <td style={S.td}>{b.email}<br /><small style={S.meta}>{b.phone}</small></td>
                      <td style={S.td}>{b.product}</td>
                      <td style={S.td}>{b.quantity}</td>
                      <td style={{ ...S.td, maxWidth: 260 }}>{b.message}</td>
                      <td style={S.td}>
                        <select value={b.status || "new"} onChange={(e) => updateBulkStatus(b._id, e.target.value)} style={S.select}>
                          {["new", "contacted", "closed"].map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={S.td}>{fmt(b.createdAt)}</td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

function Table({ cols, children }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr>{cols.map((c) => <th key={c} style={S.th}>{c}</th>)}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const S = {
  page: { padding: "120px 40px 80px", minHeight: "100vh", background: "#FAF7F1", color: "#221F1A" },
  h1: { fontSize: 44, margin: 0, fontFamily: "Fraunces, serif" },
  sub: { color: "#7C766B", marginTop: 6, marginBottom: 24 },
  tabs: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 },
  tab: { padding: "10px 18px", borderRadius: 999, border: "1px solid #E2DBCD", background: "#fff", color: "#4A463F", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  tabOn: { background: "#2C2E6B", color: "#fff", borderColor: "#2C2E6B" },
  refresh: { marginLeft: "auto", padding: "10px 14px", borderRadius: 999, border: "1px solid #E2DBCD", background: "#fff", cursor: "pointer", fontSize: 13, color: "#4A463F" },
  card: { background: "#fff", border: "1px solid #EDE7DA", borderRadius: 18, padding: 22, boxShadow: "0 10px 30px rgba(0,0,0,.04)" },
  meta: { color: "#7C766B", fontSize: 12 },
  th: { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #EDE7DA", color: "#7C766B", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  tr: { borderBottom: "1px solid #F2EDE3" },
  td: { padding: "12px", verticalAlign: "top" },
  pill: { padding: "3px 10px", borderRadius: 999, background: "#F2EDE3", color: "#4A463F", fontSize: 12 },
  select: { padding: "6px 10px", borderRadius: 8, border: "1px solid #E2DBCD", background: "#FAF7F1", color: "#221F1A", fontSize: 13 },
  del: { padding: "6px 12px", borderRadius: 8, border: "1px solid #b23b4b", background: "#fff", color: "#b23b4b", cursor: "pointer", fontSize: 12 },
};

// Lightweight order store (localStorage). Swap for a backend later.
const KEY = "notedOrders";

export const genOrderId = () =>
  "NK" +
  Date.now().toString(36).toUpperCase().slice(-6) +
  Math.floor(Math.random() * 900 + 100);

export const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const getOrder = (id) => getOrders().find((o) => o.id === id);

export const saveOrder = (order) => {
  const next = [order, ...getOrders()];
  localStorage.setItem(KEY, JSON.stringify(next));
  return order;
};

// Central backend URL for the whole app.
// Override in production/local by setting VITE_API_URL in a .env file.
export const API_BASE =
  import.meta.env.VITE_API_URL || "https://fourknotts-backend.onrender.com";

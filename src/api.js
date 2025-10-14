export const API_BASE = process.env.REACT_APP_API_URL;

console.log("🔍 API_BASE = ", process.env.REACT_APP_API_URL);


export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // keeps session cookies
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signup = async (username, email, password) => {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
};

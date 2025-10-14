// src/hooks/useProfile.js
import { useEffect, useState } from "react";
import { API_BASE } from "../api";

function normalizeUser(raw = {}) {
  const name = raw.username || raw.name || "";
  return {
    id: raw._id || null,
    name,
    email: raw.email || "",
    created_at: raw.created_at || null,
    last_login: raw.last_login || null,
  };
}

export default function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res1 = await fetch(`${API_BASE}/profile`, { credentials: "include" });
        if (!res1.ok) throw new Error();
        const data1 = await res1.json();
        if (mounted) setUser(normalizeUser(data1));
      } catch {
        try {
          const res2 = await fetch(`${API_BASE}/api/profile`, { credentials: "include" });
          if (!res2.ok) throw new Error();
          const data2 = await res2.json();
          if (mounted) setUser(normalizeUser(data2));
        } catch {
          if (mounted) setError("Unable to load profile");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  return { user, loading, error };
}

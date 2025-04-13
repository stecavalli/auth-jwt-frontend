// src/auth/auth.js
export async function getLoggedInUser() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      method: "GET",
      credentials: "include", // invia i cookie
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user; // deve corrispondere a ciò che il backend restituisce
  } catch (err) {
    console.error("Errore nel recupero utente:", err);
    return null;
  }
}

export async function logout() {
  await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
}

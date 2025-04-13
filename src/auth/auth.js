// src/auth/auth.js
export async function getLoggedInUser() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function logout() {
  await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
}

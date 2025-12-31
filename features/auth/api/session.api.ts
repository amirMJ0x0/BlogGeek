export const setSession = (tokens: {
  accessToken?: string;
  refreshToken?: string;
}) =>
  fetch("/api/auth/session", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tokens),
  });

export const clearSession = () =>
  fetch("/api/auth/logout", { method: "POST", credentials: "include" });

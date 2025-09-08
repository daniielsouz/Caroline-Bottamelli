export function saveToken(token) {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    throw new Error("saveToken: token inválido");
  }
  localStorage.setItem("token", token);
}

export function getToken() {
  const t = localStorage.getItem("token");

  if (t === "undefined" || t === "null" || t === "") return null;
  return t;
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

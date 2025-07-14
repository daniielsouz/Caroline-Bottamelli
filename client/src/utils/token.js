import CryptoJS from "crypto-js";

const secretKey = "chave-secreta-qualquer";

export function saveToken(token) {
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  localStorage.setItem("token", encryptedToken);
}

export function getToken() {
  const encryptedToken = localStorage.getItem("token");
  if (!encryptedToken) return null;
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function removeToken() {
  localStorage.removeItem("token");
}

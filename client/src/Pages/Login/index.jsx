import { useState } from "react";
import { saveToken } from "../../utils/token";
import styles from "./index.module.css";

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.trim(), password: password.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Usuário ou senha inválidos");
      if (!data.token) throw new Error("Token não recebido do servidor");

      saveToken(data.token);
      setUser("");
      setPassword("");
      onLoginSuccess ? onLoginSuccess(data.token) : window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Usuário:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            autoFocus
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

// src/Pages/Adm/Register/index.jsx
import { useState } from "react";
import style from "./index.module.css";
import Message from "../../../components/Message";
import { getToken, removeToken } from "../../../utils/token";

export default function Register() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventLocation: "",
    eventLink: "",
    isOnline: false,
  });

  const [message, setMessage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    if (name === "isOnline") {
      setFormData((prev) => ({
        ...prev,
        isOnline: checked,
        eventLocation: checked
          ? "Online"
          : prev.eventLocation === "Online"
          ? ""
          : prev.eventLocation,
      }));
      return;
    }

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setMessage({ type: "error", text: "Usuário não autenticado." });
      return;
    }

    if (
      !formData.eventName ||
      !formData.eventDescription ||
      !formData.eventDate
    ) {
      setMessage({ type: "error", text: "Preencha os campos obrigatórios." });
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/eventRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401 || res.status === 403) {
        removeToken();
        throw new Error("Sessão expirada/ inválida. Faça login novamente.");
      }
      if (!res.ok) {
        throw new Error(data.error || "Erro ao cadastrar evento");
      }

      setMessage({ type: "success", text: "Evento cadastrado com sucesso!" });

      // ✅ recarrega a página após um pequeno delay (mostra a mensagem)
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  }

  return (
    <div className={style.registerContainer}>
      {message && (
        <Message type={message.type} onClose={() => setMessage(null)}>
          {message.text}
        </Message>
      )}

      <div className={style.card}>
        <div className={style.header}>
          <h3 className={style.title}>Cadastrar evento</h3>
        </div>

        <form onSubmit={handleSubmit} className={style.eventsForm}>
          <div className={style.divInputs}>
            <div className={style.field}>
              <label htmlFor="eventName">Nome</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                placeholder="Nome do evento"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.field}>
              <label htmlFor="eventDescription">Descrição</label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="Descrição do evento"
                value={formData.eventDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.field}>
              <label htmlFor="eventDate">Data</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className={style.field}>
              <label htmlFor="eventLocation">Local</label>
              <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                placeholder="Local do evento"
                value={formData.eventLocation}
                onChange={handleChange}
                disabled={formData.isOnline}
                required={!formData.isOnline}
              />
              <div className={style.inputLocation}>
                <input
                  type="checkbox"
                  id="isOnline"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleChange}
                />
                <label htmlFor="isOnline">Evento Online</label>
              </div>
            </div>

            <div className={style.field}>
              <label htmlFor="eventLink">Link</label>
              <input
                type="text"
                id="eventLink"
                name="eventLink"
                placeholder="Link do evento"
                value={formData.eventLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={style.eventButton}>
            <button type="submit">Cadastrar Evento</button>
          </div>
        </form>
      </div>
    </div>
  );
}

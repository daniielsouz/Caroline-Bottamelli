import { useState } from "react";
import style from "./index.module.css";
import { getToken } from "../../../utils/token";

export default function Register() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventLocation: "",
    eventLink: "",
  });

  const [message, setMessage] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      setMessage({ type: "error", text: "Usuário não autenticado." });
      return;
    }

    fetch(`${apiUrl}/eventRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar evento");
        return res.json();
      })
      .then((data) => {
        setMessage({ type: "success", text: "Evento cadastrado com sucesso!" });
        setFormData({
          eventName: "",
          eventDescription: "",
          eventDate: "",
          eventLocation: "",
          eventLink: "",
        });
      })
      .catch((err) => {
        setMessage({ type: "error", text: err.message });
      });
  }

  return (
    <div className={style.registerContainer}>
      {message && (
        <p className={`${style.message} ${style[message.type]}`}>
          {message.text}
        </p>
      )}
      <form onSubmit={handleSubmit} className={style.registerForm}>
        <input
          type="text"
          name="eventName"
          placeholder="Nome do evento"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
        <textarea
          name="eventDescription"
          placeholder="Descrição do evento"
          value={formData.eventDescription}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
        />
        <input
          type="text"
          name="eventLocation"
          placeholder="Local do evento"
          value={formData.eventLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="eventLink"
          placeholder="Link do evento"
          value={formData.eventLink}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar Evento</button>
      </form>
    </div>
  );
}

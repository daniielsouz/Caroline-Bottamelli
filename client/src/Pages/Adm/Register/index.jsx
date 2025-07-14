import { useState } from "react";
import style from "./index.module.css";
import styleAdm from "./../index.module.css";
import Message from "../../../components/Message";
import { getToken } from "../../../utils/token";

export default function Register() {
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const apiUrl = import.meta.env.VITE_API_URL;

    const token = getToken();

    fetch(`${apiUrl}/eventRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro na requisição");
        return res.text();
      })
      .then((msg) => {
        e.target.reset();
        setMessage(msg);
        setTypeMessage("success");
      })
      .catch(() => {
        setMessage("Erro ao cadastrar evento.");
        setTypeMessage("error");
      });
  }

  return (
    <div className={styleAdm.divEvents}>
      {message && (
        <Message type={typeMessage} onClose={() => setMessage(null)}>
          {message}
        </Message>
      )}
      <form onSubmit={handleSubmit} className={style.eventsForm}>
        <div className={style.divInputs}>
          <div>
            <label htmlFor="eventName">Nome: </label>
            <input
              required
              autoFocus
              name="eventName"
              id="eventName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="eventDescription">Descrição: </label>
            <textarea required name="eventDescription" id="eventDescription" />
          </div>
          <div>
            <label htmlFor="eventDate">Data: </label>
            <input
              required
              type="date"
              id="eventDate"
              name="eventDate"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label htmlFor="eventLocation">Localização: </label>
            <input
              required
              name="eventLocation"
              id="eventLocation"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="eventLink">Link:</label>
            <input required type="text" name="eventLink" id="eventLink" />
          </div>
        </div>
        <div className={style.eventButton}>
          <button type="submit">Cadastrar evento</button>
        </div>
      </form>
    </div>
  );
}

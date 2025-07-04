import { useState } from "react";
import style from "./index.module.css";
import styleAdm from "./../index.module.css";
import Message from "../../../components/Message";

export default function Register() {
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/eventRegister`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((msg) => {
        e.target.reset();
        setMessage(msg);
        setTypeMessage("success");
      })
      .catch(() => {
        setMessage("Erro ao cadastrar evento.");
      });
  }

  return (
    <div>
      {message && (
        <Message type={typeMessage} onClose={() => setMessage(null)}>
          {message}
        </Message>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styleAdm.divInputs}>
          <div>
            <label htmlFor="eventName">Nome do evento: </label>
            <input name="eventName" id="eventName" type="text" />
          </div>
          <div>
            <label htmlFor="eventDescription">Descrição do evento: </label>
            <textarea name="eventDescription" id="eventDescription" />
          </div>
          <div>
            <label htmlFor="eventDate">Data do evento: </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label htmlFor="eventLocation">Localização: </label>
            <input name="eventLocation" id="eventLocation" type="text" />
          </div>
          <div>
            <label htmlFor="eventLink">Link do evento:</label>
            <input type="text" name="eventLink" id="eventLink" />
          </div>
        </div>
        <div className={style.eventButton}>
          <button type="submit">Cadastrar evento</button>
        </div>
      </form>
    </div>
  );
}

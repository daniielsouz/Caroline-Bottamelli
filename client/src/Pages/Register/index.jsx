import { useState } from "react";
import style from "./index.module.css";
export default function Register() {
  const [message, setMessage] = useState(null);
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
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <section className={style.eventRegister}>
      {message && (
        <div className={`${style.mensage} ${style.mensageVisible}`}>
          {message}
        </div>
      )}

      <h2>Bem vinda!</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.eventInputs}>
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
              onChange={(e) => console.log(e.target.value)}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
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
    </section>
  );
}

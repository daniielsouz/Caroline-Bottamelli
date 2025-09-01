import { useState } from "react";
import style from "./index.module.css";
import styleAdm from "./../index.module.css";
import Message from "../../../components/Message";
import { getToken } from "../../../utils/token";

export default function Register() {
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Define a localização corretamente
    data.eventLocation = isOnline ? "Online" : location;

    if (data.eventDate) data.eventDate = new Date(data.eventDate + "T00:00:00");

    fetch(`${import.meta.env.VITE_API_URL}/eventRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then((msg) => {
        e.target.reset();
        setIsOnline(false);
        setLocation("");
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
            <label>Nome:</label>
            <input required autoFocus name="eventName" type="text" />
          </div>

          <div>
            <label>Descrição:</label>
            <textarea required name="eventDescription" />
          </div>

          <div>
            <label>Data:</label>
            <input
              required
              type="date"
              name="eventDate"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label>Localização:</label>
            <div className={style.inputLocation}>
              <label>
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                />{" "}
                Online
              </label>

              <input
                required
                type="text"
                placeholder="Informe o local"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isOnline}
              />
            </div>
          </div>

          <div>
            <label>Link:</label>
            <input required type="text" name="eventLink" />
          </div>
        </div>

        <div className={style.eventButton}>
          <button type="submit">Cadastrar evento</button>
        </div>
      </form>
    </div>
  );
}

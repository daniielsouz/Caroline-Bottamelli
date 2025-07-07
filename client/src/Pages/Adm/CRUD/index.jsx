import { useEffect, useState } from "react";
import Message from "./../../../components/Message";
import styleAdm from "./../index.module.css";
import style from "./index.module.css";

export default function CRUD() {
  const [events, setEvents] = useState([]);
  const [eventSelected, setEventSelected] = useState(null);
  const [editing, setEditing] = useState({
    name: false,
    description: false,
    date: false,
    location: false,
    link: false,
  });
  const [message, setMessage] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    link: "",
  });
  const [selectedEventId, setSelectedEventId] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  function formDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  function updateEvent(e, field, mongoField) {
    e.preventDefault();
    const newValue = editValues[field]?.trim();

    if (!newValue) {
      setMessage({ type: "info", text: "O campo não pode estar vazio." });
      return;
    }

    const currentValue = eventSelected[mongoField];
    if (newValue === currentValue) {
      setMessage({ type: "info", text: "O valor não foi alterado." });
      return;
    }

    fetch(`${apiUrl}/event/${eventSelected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [mongoField]: newValue }),
    })
      .then((res) => res.json())
      .then((update) => {
        const updatedList = events.map((ev) =>
          ev._id === update._id ? update : ev
        );
        setEvents(updatedList);
        setEventSelected(update);
        setEditing({ ...editing, [field]: false });
        setMessage({ type: "success", text: "Salvo com sucesso." });
      })
      .catch((err) =>
        setMessage({ type: "error", text: `Erro ao salvar. Erro: ${err}` })
      );
  }

  function handleDeleteEvent(id) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    fetch(`${apiUrl}/event/deleteEvent/${id}`, { method: "DELETE" })
      .then(() => {
        setMessage({ type: "success", text: "Evento excluído com sucesso." });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() =>
        setMessage({ type: "error", text: "Erro ao excluir o evento." })
      );
  }

  function renderEditableField(label, field, mongoField, type = "text") {
    const isEditing = editing[field];
    const value =
      type === "date" && !isEditing
        ? formDate(eventSelected[mongoField])
        : eventSelected[mongoField];

    return (
      <div>
        {isEditing ? (
          <form onSubmit={(e) => updateEvent(e, field, mongoField)}>
            <input
              type={type}
              value={editValues[field] || ""}
              onChange={(e) =>
                setEditValues({ ...editValues, [field]: e.target.value })
              }
              {...(type === "date" && {
                min: new Date().toISOString().split("T")[0],
              })}
              autoFocus
            />
            <label htmlFor={`saveEdit${field}`}>
              <img
                title="Salvar Edição"
                className={style.icon}
                src="./img/confirm-icon.svg"
                alt="Icone salvar"
              />
            </label>
            <label htmlFor={`cancelEdit${field}`}>
              <img
                title="Cancelar Edição"
                className={style.icon}
                src="./img/cancel-icon.svg"
                alt="Icone cancelar"
              />
            </label>
            <button hidden id={`saveEdit${field}`} type="submit">
              Salvar
            </button>
            <button
              hidden
              id={`cancelEdit${field}`}
              type="button"
              onClick={() => setEditing({ ...editing, [field]: false })}
            >
              Cancelar
            </button>
          </form>
        ) : (
          <>
            <label htmlFor={`editButton-${field}`}>
              <img
                title={`Editar`}
                className={style.icon}
                src="./img/edit-icon.svg"
                alt="Icone para edição"
              />
            </label>
            <button
              id={`editButton-${field}`}
              hidden
              onClick={() => {
                setEditValues({
                  ...editValues,
                  [field]: eventSelected[mongoField],
                });
                setEditing({ ...editing, [field]: true });
              }}
            >
              Editar
            </button>
            <span>{value}</span>
            {field === "name" && (
              <>
                <label htmlFor="eventDel">
                  <img
                    title="Deletar evento"
                    className={style.icon}
                    src="./img/del-icon.svg"
                    alt="Icone lixeiro"
                  />
                </label>
                <button
                  hidden
                  id="eventDel"
                  onClick={() => handleDeleteEvent(eventSelected._id)}
                >
                  Excluir evento
                </button>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styleAdm.divEvents}>
      {message && (
        <Message type={message.type} onClose={() => setMessage(null)}>
          {message.text}
        </Message>
      )}

      {events.length > 0 ? (
        <>
          <select
            className={style.eventSelected}
            name="eventSelected"
            id="eventSelected"
            value={selectedEventId}
            onChange={(e) => {
              const idSelected = e.target.value;
              const selectedEvent = events.find((e) => e._id === idSelected);
              setEventSelected(selectedEvent);
              setSelectedEventId(idSelected);
            }}
          >
            <option value="" disabled>
              Selecione um evento
            </option>
            {events.map((x) => (
              <option key={x._id} value={x._id}>
                {x.eventName}
              </option>
            ))}
          </select>

          {eventSelected && (
            <div className={style.divInputsCrud}>
              {renderEditableField("Nome", "name", "eventName")}
              {renderEditableField(
                "Descrição",
                "description",
                "eventDescription"
              )}
              {renderEditableField("Data", "date", "eventDate", "date")}
              {renderEditableField("Local", "location", "eventLocation")}
              {renderEditableField("Link", "link", "eventLink")}
            </div>
          )}
        </>
      ) : (
        <h1 className={style.eventMessage}>Você não tem eventos cadastrados</h1>
      )}
    </div>
  );
}

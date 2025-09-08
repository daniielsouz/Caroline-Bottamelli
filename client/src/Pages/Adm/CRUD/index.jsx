import { useState } from "react";
import Message from "./../../../components/Message";
import styleAdm from "./../index.module.css";
import style from "./index.module.css";
import { getToken, removeToken } from "../../../utils/token";

export default function CRUD({ events = [] }) {
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

  const formDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const toInputDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    return d.toISOString().split("T")[0];
  };

  async function updateEvent(e, field, mongoField) {
    e.preventDefault();
    if (!eventSelected) return;

    const newValue = (editValues[field] ?? "").toString().trim();
    if (!newValue)
      return setMessage({
        type: "info",
        text: "O campo não pode estar vazio.",
      });

    let updatedValue = newValue;
    if (mongoField === "eventDate") {
      const d = new Date(newValue);
      if (isNaN(d))
        return setMessage({ type: "error", text: "Data inválida." });
      d.setHours(0, 0, 0, 0);
      updatedValue = d;
    }

    const currentValue =
      mongoField === "eventDate"
        ? new Date(eventSelected[mongoField]).toISOString()
        : eventSelected[mongoField] ?? "";

    const compValue =
      mongoField === "eventDate"
        ? new Date(updatedValue).toISOString()
        : updatedValue;
    if (compValue === currentValue)
      return setMessage({ type: "info", text: "O valor não foi alterado." });

    try {
      const token = getToken();
      const res = await fetch(`${apiUrl}/event/${eventSelected._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [mongoField]: updatedValue }),
      });
      const update = await res.json();
      if (res.status === 401 || res.status === 403) {
        removeToken();
        throw new Error("Sessão expirada/ inválida. Faça login novamente.");
      }
      if (!res.ok) throw new Error(update.error || "Erro ao salvar.");

      setEventSelected(update);
      setEditing({ ...editing, [field]: false });
      setMessage({ type: "success", text: "Salvo com sucesso." });
    } catch (err) {
      setMessage({
        type: "error",
        text: `Erro ao salvar. Erro: ${err.message}`,
      });
    }
  }

  async function handleDeleteEvent(id) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    try {
      const token = getToken();
      const res = await fetch(`${apiUrl}/event/deleteEvent/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401 || res.status === 403) {
        removeToken();
        throw new Error("Sessão expirada/ inválida. Faça login novamente.");
      }
      if (!res.ok) throw new Error(data.error || "Erro ao excluir o evento.");

      setMessage({ type: "success", text: "Evento excluído com sucesso." });
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  }

  function renderEditableField(field, mongoField, type = "text") {
    if (!eventSelected) return null;
    const isEditing = editing[field];
    const readValue =
      type === "date"
        ? formDate(eventSelected[mongoField])
        : eventSelected[mongoField];

    return (
      <div className={style.row}>
        {isEditing ? (
          <form
            onSubmit={(e) => updateEvent(e, field, mongoField)}
            className={style.row}
            style={{ gridTemplateColumns: "1fr auto auto" }}
          >
            <input
              type={type}
              value={
                type === "date"
                  ? editValues[field] ?? toInputDate(eventSelected[mongoField])
                  : editValues[field] ?? (eventSelected[mongoField] || "")
              }
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
                title="Salvar"
                className={style.icon}
                src="/img/confirm-icon.svg"
                alt="Salvar"
              />
            </label>
            <label htmlFor={`cancelEdit${field}`}>
              <img
                title="Cancelar"
                className={style.icon}
                src="/img/cancel-icon.svg"
                alt="Cancelar"
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
                title="Editar"
                className={style.icon}
                src="/img/edit-icon.svg"
                alt="Editar"
              />
            </label>
            <button
              id={`editButton-${field}`}
              hidden
              onClick={() => {
                let valueToEdit = eventSelected[mongoField] ?? "";
                if (mongoField === "eventDate")
                  valueToEdit = toInputDate(valueToEdit);
                setEditValues({ ...editValues, [field]: valueToEdit });
                setEditing({ ...editing, [field]: true });
              }}
            >
              Editar
            </button>
            <span>{readValue || "-"}</span>
            {field === "name" && (
              <>
                <label htmlFor="eventDel">
                  <img
                    title="Excluir"
                    className={style.icon}
                    src="/img/del-icon.svg"
                    alt="Excluir"
                  />
                </label>
                <button
                  hidden
                  id="eventDel"
                  onClick={() => handleDeleteEvent(eventSelected._id)}
                >
                  Excluir
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

      <div className={style.wrap}>
        <div className={style.card}>
          <div className={style.header}>
            <h3 className={style.title}>Gerenciar eventos</h3>
          </div>

          <select
            className={style.eventSelected}
            name="eventSelected"
            id="eventSelected"
            value={selectedEventId}
            onChange={(e) => {
              const idSelected = e.target.value;
              const selected =
                events.find((ev) => ev._id === idSelected) || null;
              setEventSelected(selected);
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

          {eventSelected ? (
            <div className={style.divInputsCrud}>
              {renderEditableField("name", "eventName")}
              {renderEditableField("description", "eventDescription")}
              {renderEditableField("date", "eventDate", "date")}
              {renderEditableField("location", "eventLocation")}
              {renderEditableField("link", "eventLink")}
            </div>
          ) : (
            <p className={style.eventMessage}>
              Selecione um evento para editar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

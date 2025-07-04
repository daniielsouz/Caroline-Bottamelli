import { useEffect, useState } from "react";
import Message from "./../../../components/Message";
import styleAdm from "./../index.module.css";

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
  const [editEventName, setEditEventName] = useState("");
  const [editEventDescription, setEditEventDescription] = useState("");
  const [editEventDate, setEditEventDate] = useState("");
  const [editEventLocation, setEditEventLocation] = useState("");
  const [editEventLink, setEditEventLink] = useState("");

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

  function updateEvent(e, nameMongo, nameDev, type) {
    e.preventDefault();
    fetch(`${apiUrl}/event/${eventSelected._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [nameMongo]: nameDev }),
    })
      .then((res) => res.json())
      .then((update) => {
        const updatedList = events.map((ev) =>
          ev._id === update._id ? update : ev
        );
        setEvents(updatedList);
        setEventSelected(update);
        setEditing({ ...editing, [type]: false });
        setMessage({ type: "success", text: "Salvo com sucesso" });
      })
      .catch((err) =>
        setMessage({ type: "error", text: `Erro ao Salvar. Erro ${err}` })
      );
  }

  function handleDeleteEvent(id) {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    fetch(`${apiUrl}/event/deleteEvent/${id}`, { method: "DELETE" })
      .then(() => {
        setMessage({ type: "success", text: "Evento excluído com sucesso" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() =>
        setMessage({ type: "error", text: "Erro ao excluir o evento" })
      );
  }

  return (
    <div>
      {message && (
        <Message type={message.type} onClose={() => setMessage(null)}>
          {message.text}
        </Message>
      )}

      {events.length > 0 && (
        <>
          <select
            name="eventSelected"
            id="eventSelected"
            defaultValue=""
            onChange={(e) => {
              const idSelected = e.target.value;
              const selectedEvent = events.find((e) => e._id === idSelected);
              setEventSelected(selectedEvent);
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
            <div className={styleAdm.divInputsCrud}>
              {/* NOME */}
              <div>
                {editing.name ? (
                  <form
                    onSubmit={(e) =>
                      updateEvent(e, "eventName", editEventName, "name")
                    }
                  >
                    <input
                      autoFocus
                      type="text"
                      value={editEventName || ""}
                      onChange={(e) => setEditEventName(e.target.value)}
                    />
                    <button type="submit">Salvar</button>
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, name: false })}
                    >
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <h2>{eventSelected.eventName}</h2>
                    <button
                      onClick={() => {
                        setEditEventName(eventSelected.eventName);
                        setEditing({ ...editing, name: true });
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(eventSelected._id)}
                    >
                      Excluir evento
                    </button>
                  </>
                )}
              </div>

              {/* DESCRIÇÃO */}
              <div>
                {editing.description ? (
                  <form
                    onSubmit={(e) => {
                      updateEvent(
                        e,
                        "eventDescription",
                        editEventDescription,
                        "description"
                      );
                    }}
                  >
                    <input
                      type="text"
                      value={editEventDescription || ""}
                      onChange={(e) => setEditEventDescription(e.target.value)}
                    />
                    <button type="submit">Salvar</button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditing({ ...editing, description: false })
                      }
                    >
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <p>{eventSelected.eventDescription}</p>
                    <button
                      onClick={() => {
                        setEditEventDescription(eventSelected.eventDescription);
                        setEditing({ ...editing, description: true });
                      }}
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>

              {/* DATA */}
              <div>
                {editing.date ? (
                  <form
                    onSubmit={(e) => {
                      updateEvent(e, "eventDate", editEventDate, "date");
                    }}
                  >
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={editEventDate}
                      onChange={(e) => setEditEventDate(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, date: false })}
                    >
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{formDate(eventSelected.eventDate)}</span>
                    <button
                      onClick={() => {
                        setEditEventDate(eventSelected.eventDate);
                        setEditing({ ...editing, date: true });
                      }}
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>

              {/* LOCAL */}
              <div>
                {editing.location ? (
                  <form
                    onSubmit={(e) => {
                      updateEvent(
                        e,
                        "eventLocation",
                        editEventLocation,
                        "location"
                      );
                    }}
                  >
                    <input
                      type="text"
                      value={editEventLocation}
                      onChange={(e) => setEditEventLocation(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditing({ ...editing, location: false })
                      }
                    >
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{eventSelected.eventLocation}</span>
                    <button
                      onClick={() => {
                        setEditEventLocation(eventSelected.eventLocation);
                        setEditing({ ...editing, location: true });
                      }}
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>

              {/* LINK */}
              <div>
                {editing.link ? (
                  <form
                    onSubmit={(e) => {
                      updateEvent(e, "eventLink", editEventLink, "link");
                    }}
                  >
                    <input
                      type="text"
                      value={editEventLink}
                      onChange={(e) => setEditEventLink(e.target.value)}
                    />
                    <button type="submit">Enviar</button>
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, link: false })}
                    >
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{eventSelected.eventLink}</span>
                    <button
                      onClick={() => {
                        setEditEventLink(eventSelected.eventLink);
                        setEditing({ ...editing, link: true });
                      }}
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

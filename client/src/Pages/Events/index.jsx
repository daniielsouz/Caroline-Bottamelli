import { useState } from "react";
import style from "./index.module.css";
import LogoCarol from "./../../assets/img/logoCarol.png";

export default function Events({ events }) {
  function formDate(date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "Data inválida";
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  }

  const sortedEvents = events
    ? [...events].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    : [];

  const onlineCount = sortedEvents.filter(
    (e) => e.eventLocation === "Online"
  ).length;
  const presencialCount = sortedEvents.filter(
    (e) => e.eventLocation !== "Online"
  ).length;

  const initialTab =
    onlineCount === 0 && presencialCount > 0 ? "Presencial" : "Online";

  const [activeTab, setActiveTab] = useState(initialTab);

  const filteredEvents = sortedEvents.filter((e) =>
    activeTab === "Online"
      ? e.eventLocation === "Online"
      : e.eventLocation !== "Online"
  );

  const cardClass =
    activeTab === "Online"
      ? style.eventsCardOnline
      : style.eventsCardPresencial;

  return (
    <>
      {sortedEvents.length > 0 && (
        <section id="Eventos" className={style.sectionEvents}>
          <div className={style.line} />
          <h3>Próximos Eventos</h3>

          <div className={style.tabs}>
            <button
              className={`${style.buttonlocation} ${
                activeTab === "Presencial"
                  ? style.activePresencial
                  : style.inactivePresencial
              }`}
              onClick={() => setActiveTab("Presencial")}
            >
              Presenciais
            </button>
            <button
              className={`${style.buttonlocation} ${
                activeTab === "Online"
                  ? style.activeOnline
                  : style.inactiveOnline
              }`}
              onClick={() => setActiveTab("Online")}
            >
              Online
            </button>
          </div>
          <div className={style.divEvents}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((e) => (
                <div key={e._id}>
                  <div className={`${style.eventsCard} ${cardClass}`}>
                    <h2>{e.eventName}</h2>
                    <div className={style.eventDescription}>
                      <span>{e.eventDescription}</span>
                      <div className={style.eventInfos}>
                        <div>
                          <img src="./img/calendar-icon.svg" alt="" />
                          <span>{formDate(e.eventDate)}</span>
                        </div>
                        <div>
                          <img src="./img/address-icon.svg" alt="" />
                          <span>{e.eventLocation}</span>
                        </div>
                      </div>
                      <div className={style.logoCarol}>
                        <img src={LogoCarol} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className={`${style.eventLink} ${cardClass}`}>
                    <a
                      title={`Inscrever-se em ${e.eventName}`}
                      href={e.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Inscrever-se
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className={style.infoEvent}>
                Nenhum evento {activeTab.toLowerCase()} disponível
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}

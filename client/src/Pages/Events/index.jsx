import { useState } from "react";
import style from "./index.module.css";
import LogoCarol from "./../../assets/img/logoCarol.png";

export default function Events({ events }) {
  function formDate(date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "Data inválida";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const sortedEvents = events
    ? [...events].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
    : [];

  // Conta eventos de cada tipo
  const onlineCount = sortedEvents.filter(
    (e) => e.eventLocation === "Online"
  ).length;
  const presencialCount = sortedEvents.filter(
    (e) => e.eventLocation !== "Online"
  ).length;

  // Define aba inicial
  let initialTab = "Online";
  if (onlineCount === 0 && presencialCount > 0) initialTab = "Presencial";
  if (presencialCount === 0 && onlineCount > 0) initialTab = "Online";

  const [activeTab, setActiveTab] = useState(initialTab);

  const filteredEvents = sortedEvents.filter((e) =>
    activeTab === "Online"
      ? e.eventLocation === "Online"
      : e.eventLocation !== "Online"
  );

  return (
    <>
      {sortedEvents.length > 0 && (
        <section
          id="Eventos"
          className={`${style.sectionEvents} ${
            activeTab === "Online" ? style.onlineBg : style.presencialBg
          }`}
        >
          <div className={style.line} />
          <h3>Próximos Eventos</h3>

          <div className={style.tabs}>
            <button
              className={`${style.eventsCardPresencial} ${style.buttonlocation}`}
              onClick={() => setActiveTab("Presencial")}
            >
              Presencial
            </button>
            <button
              className={`${style.eventsCardOnline} ${style.buttonlocation}`}
              onClick={() => setActiveTab("Online")}
            >
              Online
            </button>
          </div>

          <div className={style.divEvents}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((e) => (
                <div key={e._id}>
                  <div
                    className={`${style.eventsCard} ${
                      activeTab === "Online"
                        ? style.eventsCardOnline
                        : style.eventsCardPresencial
                    }`}
                  >
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
                  <div
                    className={`${style.eventLink} ${
                      activeTab === "Online"
                        ? style.eventsCardOnline
                        : style.eventsCardPresencial
                    }`}
                  >
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

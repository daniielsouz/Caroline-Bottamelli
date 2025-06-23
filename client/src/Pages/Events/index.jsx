import style from "./index.module.css";
import LogoCarol from "./../../assets/img/logoCarol.png";
export default function Events({ events }) {
  return (
    <>
      {events && (
        <section id="Eventos" className={style.sectionEvents}>
          <div className={style.line} />
          <h3>Proximos Eventos</h3>

          {events.map((e) => (
            <div className={style.divEvents}>
              <div>
                <div className={style.eventsCard}>
                  <h2>{e.eventName}</h2>
                  <div className={style.eventDescription}>
                    <span>{e.eventDescription}</span>
                    <div className={style.eventInfos}>
                      <div>
                        <img src="./img/calendar-icon.svg" alt="" />
                        <span>{e.eventDate}</span>
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
                <div className={style.eventLink}>
                  <a href={e.eventLink} target="_blank">
                    link para o evento
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

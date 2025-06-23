import style from "./index.module.css";
import LogoCarol from "./../../assets/img/logoCarol.png";
export default function Events({ events }) {
  return (
    <>
      {events && (
        <section id="Eventos" className={style.sectionEvents}>
          <div className={style.line} />
          <h3>Proximos Eventos</h3>

          {/* Daqui pra baixo vai ser com um map depois */}

          <div className={style.divEvents}>
            <div>
              <div className={style.eventsCard}>
                <h2>Nome evento</h2>
                <div className={style.eventDescription}>
                  <span>
                    "Um encontro exclusivo para desbloquear seu potencial com
                    insights práticos, networking e orientações estratégicas com
                    especialistas da área."
                  </span>
                  <div className={style.eventInfos}>
                    <div>
                      <img src="./img/calendar-icon.svg" alt="" />
                      <span>20/04/1195</span>
                    </div>
                    <div>
                      <img src="./img/address-icon.svg" alt="" />
                      <span>Rua Pedro Lauro de Souza, 395</span>
                    </div>
                  </div>
                  <div className={style.logoCarol}>
                    <img src={LogoCarol} alt="" />
                  </div>
                </div>
              </div>
              <div className={style.eventLink}>
                <a href="#">link para o evento</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

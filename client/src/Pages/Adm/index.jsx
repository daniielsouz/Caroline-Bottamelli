import { useState, useEffect } from "react";
import style from "./index.module.css";
import Register from "./Register";
import CRUD from "./CRUD";
import returnIcon from "../../assets/img/return.svg";

export default function Adm({ events = [] }) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(events && events.length > 0 ? "crud" : "register");
  }, [events]);

  return (
    <section className={style.sectionMain}>
      <h2 className={style.sectionTitle}>Bem vinda!</h2>

      <div className={style.tabs} role="tablist" aria-label="Gerenciar eventos">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "crud"}
          className={`${style.tab} ${
            activeTab === "crud" ? style.tabActive : ""
          }`}
          onClick={() => setActiveTab("crud")}
        >
          Eventos cadastrados
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "register"}
          className={`${style.tab} ${
            activeTab === "register" ? style.tabActive : ""
          }`}
          onClick={() => setActiveTab("register")}
        >
          Cadastrar Eventos
        </button>
      </div>

      <div className={style.eventsCustom} role="tabpanel">
        {activeTab === "crud" ? <CRUD events={events} /> : <Register />}
      </div>

      <a className={style.return} href="/" aria-label="Retornar">
        <img src={returnIcon} alt="Retornar" />
      </a>
    </section>
  );
}

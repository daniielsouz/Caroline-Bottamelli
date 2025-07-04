import { useState, useEffect } from "react";
import style from "./index.module.css";
import Register from "./Register";
import CRUD from "./CRUD";

export default function Adm({ events }) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (events.length > 0) {
      setActiveTab("crud");
    } else {
      setActiveTab("register");
    }
  }, [events]);

  return (
    <section className={style.sectionMain}>
      <h2 className={style.sectionTitle}>Bem vinda!</h2>
      <div className={style.buttonsDiv}>
        <button
          className={activeTab === "crud" ? style.active : ""}
          onClick={() => setActiveTab("crud")}
        >
          Eventos cadastrados
        </button>
        <button
          className={activeTab === "register" ? style.active : ""}
          onClick={() => setActiveTab("register")}
        >
          Cadastrar Eventos
        </button>
      </div>

      <div className={style.eventsCustom}>
        {activeTab === "crud" ? <CRUD /> : <Register />}
      </div>

      <a className={style.return} href="/">
        Voltar para página principal
      </a>
    </section>
  );
}

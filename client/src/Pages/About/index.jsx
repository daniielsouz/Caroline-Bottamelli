import Carol from "../../assets/img/Carol.png";
import style from "./index.module.css";
export default function About() {
  return (
    <section id="Home" className={style.about}>
      <div className={style.aboutText}>
        <h2>
          Sou <strong className={style.focus}>empresária</strong>,{" "}
          <strong className={style.focus}>mentora</strong>,{" "}
          <strong className={style.focus}>
            estrategista de posicionamento
          </strong>{" "}
          e <strong className={style.focus}>personal branding</strong>. <br />
          Lidero uma comunidade de mulheres
          <br />
          <strong className={style.emphasize}> POSICIONADAS</strong>.
        </h2>
        <p>É possível sim levar o digital de forma leve. </p>
      </div>
      <div className={style.aboutImg}>
        <img src={Carol} alt="Imagem Carol Bottamelli" />
      </div>
    </section>
  );
}

import Carol from "../../assets/img/Carol.png";
import style from "./index.module.css";
export default function About() {
  return (
    <>
      <section id="Home" className={style.about}>
        <div className={style.aboutText}>
          <div>
            <div className={style.lineAbout} />
            <h2>
              Sou <strong className={style.focus}>empresária</strong>,{" "}
              <strong className={style.focus}>mentora</strong>,{" "}
              <strong className={style.focus}>
                estrategista de posicionamento
              </strong>{" "}
              e <strong className={style.focus}>personal branding</strong>.{" "}
              <br />
              Lidero uma comunidade de mulheres
              <br />
              <strong className={style.emphasize}> POSICIONADAS</strong>.
            </h2>
          </div>
          <p>É possível sim levar o digital de forma leve. </p>
        </div>
        <div className={style.aboutImg}>
          <img src={Carol} alt="Imagem Carol Bottamelli" />
        </div>
      </section>
      <section className={style.aboutIntro}>
        <div className={style.divLine} />
        <p className={style.textIntro}>
          Nossos movimentos acompanham você em cada etapa da sua{" "}
          <strong> jornada como empreendedora</strong>.
          <br />
          Pensamos em cada fase para oferecer <strong>apoio</strong>,{" "}
          <strong>clareza</strong> e ferramentas certas para o seu momento,
          respeitando seu ritmo e potencial. Aqui, cada passo é um convite para{" "}
          crescer com <strong className={style.focus}>segurança</strong>,{" "}
          <strong className={style.focus}>confiança</strong> e{" "}
          <strong className={style.focus}>propósito</strong>.
        </p>
      </section>
    </>
  );
}

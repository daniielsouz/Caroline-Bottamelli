import Carol from "../../assets/img/Carol.png";
import style from "./index.module.css";
export default function About() {
  return (
    <>
      <section id="Home" className={style.about}>
        <div className={style.aboutText}>
          <div>
            <div className={style.lineAbout} />
            <div>
              <h2>Olá, me chamo Carol Bottamelli</h2>
              <h2>
                Sou <strong className={style.focus}>empresária</strong>,{" "}
                <strong className={style.focus}>mentora</strong>,{" "}
                <strong className={style.focus}>
                  estrategista de posicionamento
                </strong>{" "}
                e <strong className={style.focus}>personal branding</strong>.{" "}
                <br />
              </h2>
              <h2 style={style.textSpacing}>
                Lidero uma comunidade de mulheres
                <br />
                <strong className={style.emphasize}> POSICIONADAS</strong>.
              </h2>
            </div>
          </div>
          <p>
            Levanto a bandeira de que é possível levar o digital de forma leve e
            assertiva.{" "}
          </p>
        </div>
        <div className={style.aboutImg}>
          <img src={Carol} alt="Imagem Carol Bottamelli" />
        </div>
      </section>
      <section className={style.aboutIntro}>
        <p className={style.textIntro}>
          Nossos movimentos acompanham você em cada etapa da sua{" "}
          <strong> jornada como empreendedora</strong>.
          <br />
          Pensamos em cada fase para oferecer <strong>apoio</strong>,{" "}
          <strong>clareza</strong> e ferramentas certas para o seu momento,
          respeitando seu ritmo e potencial.
          <br />
          <br />
          Aqui, cada passo é um convite para crescer com{" "}
          <strong className={style.focus}>direção</strong>,{" "}
          <strong className={style.focus}>estratégia</strong> e{" "}
          <strong className={style.focus}>essência</strong>.
        </p>
      </section>
    </>
  );
}

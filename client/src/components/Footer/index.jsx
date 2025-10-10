import style from "./index.module.css";

export default function Footer() {
  return (
    <>
      <blockquote className={style.quote}>
        <div>
          <p>O seu diferencial está na sua essência.</p>
          <span className={style.signature}>- Carol Bottamelli -</span>
        </div>
      </blockquote>

      <footer className={style.footer}>
        <a href="https://wa.me/554791400520" target="__blank" rel="noreferrer">
          <span>Restou alguma dúvida? {""}</span>
          <span>Entre em contato com nossa equipe!</span>
        </a>
      </footer>
    </>
  );
}

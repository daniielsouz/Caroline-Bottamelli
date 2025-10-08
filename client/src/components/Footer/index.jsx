import style from "./index.module.css";

export default function Footer() {
  return (
    <>
      <blockquote className={style.quote}>
        <p>O seu diferencial está na sua essência.</p>
        <footer>— Carol Bottamelli</footer>
      </blockquote>
      <footer className={style.footer}>
        <a href="http://wa.me/554791400520" target="__blank">
          <span>Restou alguma dúvida ?</span>
          <span>Entre em contato com nossa equipe!</span>
        </a>
      </footer>
    </>
  );
}

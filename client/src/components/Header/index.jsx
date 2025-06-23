import style from "./index.module.css";

export default function Header({ events }) {
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <ul className={style.menu}>
          <li>
            <a href="#Home">Home</a>
          </li>
          {events && (
            <li>
              <a href="#Eventos">Eventos</a>
            </li>
          )}
          <li>
            <a href="#Potencialize">Potencialize</a>
          </li>
          <li>
            <a href="#Fenix">Fênix Mentoria</a>
          </li>
          <li>
            <a href="#Branding">Projeto de Branding</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

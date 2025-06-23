import style from "./index.module.css";

export default function Header({ events }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <ul className={style.menu}>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("Home");
              }}
            >
              Home
            </a>
          </li>
          {events.length > 0 && (
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("Eventos");
                }}
              >
                Eventos
              </a>
            </li>
          )}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("Potencialize");
              }}
            >
              Potencialize
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("Fenix");
              }}
            >
              Fênix Mentoria
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("Branding");
              }}
            >
              Projeto de Branding
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

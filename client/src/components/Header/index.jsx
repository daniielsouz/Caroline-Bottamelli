import { useEffect, useState } from "react";
import style from "./index.module.css";

export default function Header({ events }) {
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${style.header}`}>
      <nav className={`${style.navbar} ${style[activeSection] || ""}`}>
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

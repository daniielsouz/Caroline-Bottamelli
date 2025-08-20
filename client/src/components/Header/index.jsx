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
    const target = document.getElementById(id);
    if (!target) return;

    const navbarHeight = document.querySelector("header").offsetHeight;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 600;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      window.scrollTo(0, startPosition + distance * ease(progress / duration));
      if (progress < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
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
      <a
        className={style.linkInsta}
        href="https://www.instagram.com/carolbottamelli?igsh=MTB3a2Z0ZWxsY2Vxaw=="
        target="__blanc"
      >
        <img
          src="img/icon-instagram.svg"
          alt="Icone instagram"
          title="Me acompanhe no instagram"
        />
      </a>
    </header>
  );
}

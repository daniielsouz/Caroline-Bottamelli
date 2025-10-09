import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Potencialize from "./Pages/Potencialize";
import Fenix from "./Pages/Fenix";
import Branding from "./Pages/Branding";
import Footer from "./components/Footer";
import Adm from "./Pages/Adm";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";

// Habilitar instrumentação do localStorage apenas em DEV
if (import.meta.env.DEV) {
  (function instrumentLocalStorage() {
    const _setItem = localStorage.setItem;
    const _removeItem = localStorage.removeItem;

    localStorage.setItem = function (key, value) {
      console.log(`[LS] setItem ${key} =`, value);
      return _setItem.apply(this, arguments);
    };

    localStorage.removeItem = function (key) {
      console.log(`[LS] removeItem ${key}`);
      return _removeItem.apply(this, arguments);
    };

    console.log("[LS] instrumentation ON");
  })();
}

function setOrCreateTag(selector, tagName, attrs) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(tagName);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function setOrCreateMeta(name, content) {
  setOrCreateTag(`meta[name="${name}"]`, "meta", { name, content });
}

function setOrCreateCanonical(href) {
  setOrCreateTag('link[rel="canonical"]', "link", { rel: "canonical", href });
}

function useRouteSEO({ title, description, robots, canonicalHref }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setOrCreateMeta("description", description);
    if (robots) setOrCreateMeta("robots", robots);
    if (canonicalHref) setOrCreateCanonical(canonicalHref);
  }, [title, description, robots, canonicalHref]);
}

function MainPage({ events }) {
  const location = useLocation();
  const canonical = useMemo(
    () =>
      `https://carolbottamelli.com.br${
        location.pathname === "/" ? "/" : location.pathname
      }`,
    [location.pathname]
  );

  useRouteSEO({
    title: "Carol Bottamelli - Posicionamento Estratégico",
    description:
      "Descubra o seu diferencial através da sua essência. Autoconhecimento, posicionamento estratégico e transformação com Carol Bottamelli.",
    robots: "index,follow",
    canonicalHref: canonical,
  });

  return (
    <>
      <Header events={events || []} />
      <About />
      {Array.isArray(events) && events.length > 0 && <Events events={events} />}
      <Potencialize />
      <Fenix />
      <Branding />
      <Footer />
    </>
  );
}

function LoginPage({ onLoginSuccess }) {
  const location = useLocation();
  const canonical = useMemo(
    () => `https://carolbottamelli.com.br${location.pathname}`,
    [location.pathname]
  );

  useRouteSEO({
    title: "Login - Caroline Bottamelli",
    description: "Acesso ao painel administrativo.",
    robots: "noindex,nofollow",
    canonicalHref: canonical,
  });

  return <Login onLoginSuccess={onLoginSuccess} />;
}

function AdmPage({ token, events }) {
  const location = useLocation();
  const canonical = useMemo(
    () => `https://carolbottamelli.com.br${location.pathname}`,
    [location.pathname]
  );

  useRouteSEO({
    title: "Administração - Caroline Bottamelli",
    description: "Painel administrativo.",
    robots: "noindex,nofollow",
    canonicalHref: canonical,
  });

  return (
    <PrivateRoute token={token}>
      <Adm events={events || []} />
    </PrivateRoute>
  );
}

function AppRoutesWrapper() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!apiUrl) return;
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${apiUrl}/events`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        // Silencioso para não poluir console em produção
      }
    })();

    return () => ac.abort();
  }, [apiUrl]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "token") setToken(e.newValue || "");
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function onLoginSuccess(receivedToken) {
    if (
      typeof receivedToken === "string" &&
      receivedToken.split(".").length === 3
    ) {
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
    }
    navigate("/adm");
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLoginSuccess={onLoginSuccess} />}
      />
      <Route path="/adm" element={<AdmPage token={token} events={events} />} />
      <Route path="*" element={<MainPage events={events} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/">
      <AppRoutesWrapper />
    </BrowserRouter>
  );
}

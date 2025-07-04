import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Potencialize from "./Pages/Potencialize";
import Fenix from "./Pages/Fenix";
import Branding from "./Pages/Branding";
import Adm from "./Pages/Adm/index";
import Register from "./Pages/Adm/Register";

function MainPage({ events }) {
  return (
    <>
      <Header events={events} />
      <About />
      {events.length > 0 && <Events events={events} />}
      <Potencialize />
      <Fenix />
      <Branding />
    </>
  );
}

function AppRoutes() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log("Erro ao buscar eventos", err));
  }, []);

  return (
    <Routes>
      <Route path="/adm" element={<Adm events={events} />} />
      <Route path="*" element={<MainPage events={events} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

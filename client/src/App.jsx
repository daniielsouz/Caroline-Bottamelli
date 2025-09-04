import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

function MainPage({ events }) {
  return (
    <>
      <Header events={events || []} />
      <About />
      {events && events.length > 0 && <Events events={events} />}
      <Potencialize />
      <Fenix />
      <Branding />
      <Footer />
    </>
  );
}

function AppRoutesWrapper() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data || []))
      .catch((err) => console.log("Erro ao buscar eventos", err));
  }, []);

  function onLoginSuccess(receivedToken) {
    setToken(receivedToken);
    localStorage.setItem("token", receivedToken);
    navigate("/adm");
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLoginSuccess={onLoginSuccess} />}
      />
      <Route
        path="/adm"
        element={
          <PrivateRoute token={token}>
            <Adm events={events || []} />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<MainPage events={events || []} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutesWrapper />
    </BrowserRouter>
  );
}

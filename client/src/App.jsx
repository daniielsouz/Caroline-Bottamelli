import { useState } from "react";

import Header from "./components/Header";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Potencialize from "./Pages/Potencialize";
import Fenix from "./Pages/Fenix";
import Branding from "./Pages/Branding";
function App() {
  const [events, setEnvents] = useState(true);
  return (
    <>
      <Header events={events} />
      <About />
      <Events events={events} />
      <Potencialize />
      <Fenix />
      <Branding />
    </>
  );
}

export default App;

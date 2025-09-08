require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

const USER = { user: process.env.USER, password: process.env.PASSWORD };

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  if (user === USER.user && password === USER.password) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET); // sem expiração
    return res.json({ token });
  }
  return res.status(401).json({ error: "Credenciais inválidas" });
});

function authenticateToken(req, res, next) {
  try {
    const auth =
      req.headers["authorization"] || req.headers["Authorization"] || "";
    const [scheme, rawToken] = auth.split(" ").map((s) => (s || "").trim());
    if (
      !scheme ||
      !/^Bearer$/i.test(scheme) ||
      !rawToken ||
      rawToken === "null" ||
      rawToken === "undefined"
    ) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    jwt.verify(rawToken.trim(), process.env.JWT_SECRET, (err, payload) => {
      if (err) return res.status(403).json({ error: "Token inválido" });
      req.user = payload;
      next();
    });
  } catch {
    return res.status(401).json({ error: "Falha na autenticação" });
  }
}

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventLocation: { type: String, default: "" },
  eventLink: { type: String, default: "" },
  isOnline: { type: Boolean, default: false },
});
const Event = mongoose.model("Event", eventSchema);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conexão com MongoDB estabelecida"))
  .catch((err) => console.error("Erro ao conectar com MongoDB:", err));

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch {
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.get("/adm", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch {
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.post("/eventRegister", authenticateToken, async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      eventLocation,
      eventLink,
      isOnline,
    } = req.body;
    if (!eventName || !eventDescription || !eventDate) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }
    const parsedDate = new Date(eventDate);
    if (Number.isNaN(parsedDate.getTime()))
      return res.status(400).json({ error: "Data inválida." });
    parsedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDate < today)
      return res
        .status(400)
        .json({ error: "A data do evento não pode ser no passado." });

    const data = {
      eventName: String(eventName).trim(),
      eventDescription: String(eventDescription).trim(),
      eventDate: parsedDate,
      eventLocation: isOnline ? "Online" : String(eventLocation || "").trim(),
      eventLink: String(eventLink || "").trim(),
      isOnline: !!isOnline,
    };
    const newEvent = new Event(data);
    await newEvent.save();
    res.json({ message: "Salvo com sucesso", event: newEvent });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Erro ao salvar evento" });
  }
});

app.put("/event/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const data = { ...req.body };
    if (data.eventDate) {
      const d = new Date(data.eventDate);
      if (Number.isNaN(d.getTime()))
        return res.status(400).json({ error: "Data inválida." });
      d.setHours(0, 0, 0, 0);
      data.eventDate = d;
    }
    if (typeof data.isOnline === "boolean") {
      if (data.isOnline) data.eventLocation = "Online";
      else if (data.eventLocation === "Online") data.eventLocation = "";
    }
    const updated = await Event.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Erro ao atualizar evento" });
  }
});

app.delete("/event/deleteEvent/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: "Evento excluído com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao excluir evento" });
  }
});

cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    await Event.deleteMany({ eventDate: { $lt: now } });
  } catch {}
});

/* >>> SERVE SPA em /adm <<< */
app.use("/adm", express.static(path.join(__dirname, "client", "dist")));
app.get("/adm/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

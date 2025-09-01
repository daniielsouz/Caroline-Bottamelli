require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

const USER = {
  user: process.env.USER,
  password: process.env.PASSWORD,
};

// Login
app.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (user === USER.user && password === USER.password) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Schema do evento
const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  eventDate: Date,
  eventLocation: String,
  eventLink: String,
});

const Event = mongoose.model("Event", eventSchema);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conexão estabelecida"))
  .catch((err) => console.error("Erro ao conectar", err));

// Rotas
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.get("/adm", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.post("/eventRegister", authenticateToken, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.eventDate) {
      data.eventDate = new Date(data.eventDate); // garante tipo Date
    }

    const newEvent = new Event(data);
    await newEvent.save();
    res.send("Salvo com sucesso");
  } catch (err) {
    console.error("Erro ao salvar", err);
    res.status(500).send("Erro ao salvar");
  }
});

app.put("/event/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const data = { ...req.body };
    if (data.eventDate) {
      data.eventDate = new Date(data.eventDate);
    }

    const updated = await Event.findByIdAndUpdate(id, data, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Erro ao atualizar", err);
    res.status(500).send("Erro ao atualizar");
  }
});

app.delete("/event/deleteEvent/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.send("Evento excluído com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao excluir o evento");
  }
});

cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const result = await Event.deleteMany({
      eventDate: { $lt: now },
    });

    if (result.deletedCount > 0) {
      console.log(`Eventos excluídos automaticamente: ${result.deletedCount}`);
    } else {
      console.log("Nenhum evento para excluir hoje.");
    }
  } catch (err) {
    console.error("Erro ao excluir eventos expirados:", err);
  }
});

// Inicializa servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const USER = {
  user: process.env.USER,
  password: process.env.PASSWORD,
};

app.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (user === USER.user && password === USER.password) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

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

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  eventDate: String,
  eventLocation: String,
  eventLink: String,
});
const Event = mongoose.model("Event", eventSchema);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conexão estabelecida"))
  .catch((err) => console.error("Erro ao conectar", err));

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.get("/adm", authenticateToken, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.post("/eventRegister", authenticateToken, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
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
    const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
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

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

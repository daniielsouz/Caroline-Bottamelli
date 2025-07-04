require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const db = require("mongoose");
const { default: mongoose } = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  eventDate: String,
  eventLocation: String,
  eventLink: String,
});

const Event = mongoose.model("Event", eventSchema);

db.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Conexão estabelecida");
  })
  .catch((err) => {
    console.error("erro ao conectar", err);
  });
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
    res.status(500).send("Erro ao buscar eventos");
  }
});

app.post("/eventRegister", async (requisicao, resposta) => {
  try {
    const newEvent = new Event(requisicao.body);
    await newEvent.save();

    resposta.send("Salvo com sucesso");
  } catch (err) {
    console.error("Deu merda", err);
  }
});

app.put("/event/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updateEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updateEvent);
  } catch {
    (err) => {
      console.error(err);
    };
  }
});

app.delete("/event/deleteEvent/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json("Evento excluido");
  } catch (err) {
    res.json("Houve um problema ao excluir o projeto");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

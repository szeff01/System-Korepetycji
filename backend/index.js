const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData");
const TeacherModel = require("./models/Teacher");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/customers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Rejestracja użytkownika
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        return res.json("Already registered");
      }
      return FormDataModel.create(req.body);
    })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// Logowanie użytkownika
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json("No records found!");
      }
      if (user.password === password) {
        return res.json("Success");
      }
      res.json("Wrong password");
    })
    .catch((err) => res.status(500).json(err));
});

// Pobranie wszystkich korepetytorów
app.get("/teachers", (req, res) => {
  TeacherModel.find()
    .then((teachers) => res.json(teachers))
    .catch((err) => res.status(500).json(err));
});

// Pobranie szczegółów korepetytora po ID
app.get("/teachers/:id", (req, res) => {
  const { id } = req.params;
  TeacherModel.findById(id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json(teacher);
    })
    .catch((err) => res.status(500).json(err));
});

// Dodanie nowego korepetytora
app.post("/teachers", (req, res) => {
  const newTeacher = new TeacherModel(req.body);
  newTeacher
    .save()
    .then((teacher) => res.status(201).json(teacher))
    .catch((err) => res.status(400).json(err));
});

// Usunięcie korepetytora po ID
app.delete("/teachers/:id", (req, res) => {
  const { id } = req.params;
  TeacherModel.findByIdAndDelete(id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json({ message: "Teacher deleted successfully" });
    })
    .catch((err) => res.status(500).json(err));
});

// Aktualizacja danych korepetytora
app.put("/teachers/:id", (req, res) => {
  const { id } = req.params;
  TeacherModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.json(teacher);
    })
    .catch((err) => res.status(500).json(err));
});

// Uruchomienie serwera
app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});

app.get("/teachers", (req, res) => {
    TeacherModel.find()
      .then((teachers) => res.json(teachers))
      .catch((err) => res.status(500).json({ error: err.message }));
  });
  

  // Filtrowanie korepetytorów po kategorii
app.get("/teachers", (req, res) => {
    const { category } = req.query;
  
    if (category) {
      TeacherModel.find({ categories: { $regex: category, $options: "i" } }) // Wyszukiwanie z użyciem regex
        .then((teachers) => res.json(teachers))
        .catch((err) => res.status(500).json({ error: err.message }));
    } else {
      TeacherModel.find()
        .then((teachers) => res.json(teachers))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  });
  

  
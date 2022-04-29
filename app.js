const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
});

const noteSchema = {
  title: String,
  content: String,
};

const Note = mongoose.model("Note", noteSchema);

app
  .route("/notes")
  .get(async (req, res) => {
    try {
      const allNotes = await Note.find({});
      res.json(allNotes);
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res) => {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });

    try {
      await newNote.save();
      res.json(newNote);
    } catch (e) {
      console.log(e);
    }
  })
  .delete(async (req, res) => {
    const id = req.query.id;
    // console.log(id);
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      res.json(deletedNote);
    } catch (e) {
      console.log(e);
    }
  });

app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});

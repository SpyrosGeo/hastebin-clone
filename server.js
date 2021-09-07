import express from "express";
// const mongoose = require('mongoose')
import mongoose from "mongoose";
import Document from "./models/Document.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = 5000;

const username =process.env.MONGODB_USERNAME
const password  =process.env.MONGODB_USERNAME

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.mrs6z.mongodb.net/failbin?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.get("/", (req, res) => {
  const code = `Welcome to WasteBin
    
Use the commands in the top right corner
to create a new file to share with others`;
  res.render("code-display", {
    code: code,
    language:'plaintext'
  });
});

//Create New Document
app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
    const value = req.body.value
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (error) {
    res.render("new", { value });
  }
});

//specific note route

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value });
  } catch (error) {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import { MongoDBURL } from "./config.js";
import { Book } from "./models/BookModel.js";

const app = express();
const PORT = 3000;
// Middleware Baghayla
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the backend server!");
});

//To Add an Book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author , publishYear",
      });
    }
    const newBook = await Book.create(req.body);
    return res.status(201).send(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App Connected To Database Successfully!");
    app.listen(PORT, () => {
      console.log(`App Listening On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

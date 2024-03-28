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

//To Add an Book (CREATE)
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

// Show All Books(READ)
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).message({ message: err.message });
  }
});

// Modify Any Books (UPDATE)

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please provide all required fields!");
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// Remove Books (DELETE)
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
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

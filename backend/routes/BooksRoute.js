import express from "express";
import { Book } from "../models/BookModel.js";

const router = express.Router();

//To Add an Book (CREATE)
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

// Find Book By ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).message({ message: error.message });
  }
});

export default router;

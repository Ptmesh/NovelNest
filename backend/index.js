import express from "express";
import mongoose from "mongoose";
import { MongoDBURL } from "./config.js";
import BooksRoute from "./routes/BooksRoute.js";

const app = express();
const PORT = 3000;

// Middleware Baghayla
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the backend server!");
});
app.use("/books", BooksRoute);
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

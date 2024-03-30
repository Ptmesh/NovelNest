import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeBtn from "./HomeBtn";
import Navbar from "./Navbar";

const ViewBook = () => {
  const [book, setBook] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="main-layout">
        <h1>Showing Book</h1>
        {loading ? (
          <h2>Please Wait</h2>
        ) : (
          <div>
            <div className="info">
              <span>ID</span>
              <span>{book._id}</span>
            </div>
            <div className="info">
              <span>Title</span>
              <span>{book.title}</span>
            </div>
            <div className="info">
              <span>Author</span>
              <span>{book.author}</span>
            </div>
            <div className="info">
              <span>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
            <div className="info">
              <span>Created At</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="info">
              <span>Updated At</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
            <HomeBtn />
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBook;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:3000/books`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <h1>Add Book..</h1>
        {loading ? <h3>Please Wait</h3> : " "}
        <div className="add-form">
          <div>
            <label>Book Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
          <button className="btn" onClick={handleAdd}>
            Add<i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBook;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeBtn from "./HomeBtn";
import Navbar from "./Navbar";

const EditBook = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wrong..Please Try Again Later!");
        setLoading(false);
      });
  };
  return (
    <>
      <Navbar />
      <div className="main-layout">
        <h2>Edit Book</h2>
        {loading ? <h3>Please Wait</h3> : ""}
        <div>
          <div>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Author</span>
            <input
              type="text"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Publish Year</span>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>
          <button className="btn" onClick={handleEdit}>
            Update Book <i class="fa-solid fa-pen"></i>
          </button>
          <HomeBtn />
        </div>
      </div>
    </>
  );
};

export default EditBook;

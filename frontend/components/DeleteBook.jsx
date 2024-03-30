import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeBtn from "./HomeBtn";
import Navbar from "./Navbar";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    setLoading(false);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Something Went Wrong, Please try again later!");
        setLoading(false);
      });
  };
  return (
    <>
      <Navbar />
      <div className="main-layout">
        <h1>Delete Book</h1>
        {loading ? (
          <h1>Please Wait</h1>
        ) : (
          <div>
            <h3>Are you sure you want to delete this book?</h3>
            <button className="btn-delete" onClick={handleDelete}>
              Yes Go Ahead <i class="fa-solid fa-trash"></i>
            </button>
            <HomeBtn />
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteBook;

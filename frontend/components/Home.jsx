import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookEntry from "./BookEntry";
import Navbar from "./Navbar";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBooks(res.data.data);
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
        <h1>Home Book List</h1>
        <div className="create">
          <Link to="/books/create" className="homebtn">
            <i className="fas fa-plus"></i>
          </Link>
        </div>

        <div className="main-home-content">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              {books.map((book) => (
                <BookEntry key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

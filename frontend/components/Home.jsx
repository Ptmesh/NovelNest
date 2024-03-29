import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div>
        <h1>Home Book List</h1>
        <div>
          <Link to="/books/create">
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publish Year</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publishYear}</td>
                    <td>
                      <Link to={`/books/view/${book._id}`}>
                        <i className="fas fa-info"></i>
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <i className="fas fa-trash"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

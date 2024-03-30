import React from "react";
import { Link } from "react-router-dom";

const BookEntry = ({ book }) => {
  return (
    <div className="book-entry">
      <div>Title: {book.title}</div>
      <div>Author: {book.author}</div>
      <div>Publish Year: {book.publishYear}</div>
      <div>
        <Link className="infobtn" to={`/books/view/${book._id}`}>
          <i className="fas fa-info"></i>
        </Link>
        <Link to={`/books/edit/${book._id}`} className="editbtn">
          <i className="fas fa-edit"></i>
        </Link>
        <Link to={`/books/delete/${book._id}`} className="deletebtn">
          <i className="fas fa-trash"></i>
        </Link>
      </div>
    </div>
  );
};

export default BookEntry;

import { Route, Routes } from "react-router-dom";
import AddBook from "../components/AddBook.jsx";
import DeleteBook from "../components/DeleteBook.jsx";
import EditBook from "../components/EditBook.jsx";
import Home from "../components/Home.jsx";
import ViewBook from "../components/ViewBook.jsx";
import "./index.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<AddBook />} />
        <Route path="/books/view/:id" element={<ViewBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
      </Routes>
    </>
  );
}

export default App;

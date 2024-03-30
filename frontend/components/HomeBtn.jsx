import React from "react";
import { useNavigate } from "react-router-dom";

const HomeBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="homebtn"
      onClick={() => {
        navigate("/");
      }}
    >
      Home
    </button>
  );
};

export default HomeBtn;

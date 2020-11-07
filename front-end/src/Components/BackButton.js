import React from "react";
import { Link } from "react-router-dom";
import "./BackButton.css";

function BackButton() {
  return (
    <Link to="/">
      <div className="back-button">
        <img src="/back.svg" alt="Back Button" />
      </div>
    </Link>
  );
}

export default BackButton;

import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

function HomeCard(props) {
  return (
    <div className="home-card-parent">
      <img src={props.image} alt={props.alt} />
      <h2>{props.title}</h2>
      <Link to={props.path}>
        <div className="click-circle">
          <img src="/right-arrow.svg" alt="click" />
        </div>
      </Link>
    </div>
  );
}

export default HomeCard;

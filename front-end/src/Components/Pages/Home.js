import React from "react";
import HomeCard from "../Cards";
import "./Home.css";

function Home() {
  return (
    <div className="home-parent">
      <HomeCard
        title="Create User"
        path="/create-user"
        image="/create-user.svg"
        alt="Create User Image"
      ></HomeCard>
      <HomeCard
        title="Define Relation"
        path="/define-relation"
        image="/define-relation.svg"
        alt="Define Relation Image"
      ></HomeCard>
      <HomeCard
        title="Find Relation"
        path="/find-relation"
        image="/find-relation.svg"
        alt="Find Relation Image"
      ></HomeCard>
    </div>
  );
}

export default Home;

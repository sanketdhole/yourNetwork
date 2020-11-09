import React, { useState } from "react";
import BackButton from "../BackButton";
import UserSearch from "../UserSearch";
import "./DefineRelation.css";
import "./PageCommon.css";

function DefineRelation(props) {
  const [relation, setRelation] = useState("Relation");
  const [relationSelectorClass, setRelationSelectorClass] = useState(false);
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [defineRelationClass, setDefineRelationClass] = useState(false);

  let handleUpdateUser1 = (userObject) => {
    setFirstUser(userObject);
  };

  let handleUpdateUser2 = (userObject) => {
    setSecondUser(userObject);
  };

  let handleRelationSelection = (event) => {
    setRelation(event.target.innerText);
    setRelationSelectorClass(true);
  };

  let createRelation = () => {
    if (firstUser === null || secondUser === null || relation === "Relation") {
      return;
    }
    fetch("http://18.190.37.127/api/relation/create", {
      method: "POST",
      body: JSON.stringify({
        user1: firstUser,
        user2: secondUser,
        type: relation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setDefineRelationClass(true);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <BackButton></BackButton>
      <div className="page-parent">
        <div className="page-panel">
          <img
            src="/define-relation.svg"
            alt="Define Relation"
            className="page-img"
          />
          <h2>Define Relation</h2>
          <UserSearch
            placeholder="Search First User"
            updateUser={handleUpdateUser1}
          ></UserSearch>
          <UserSearch
            placeholder="Search Second User"
            updateUser={handleUpdateUser2}
          ></UserSearch>
          <div className="dropdown">
            <button
              className={`dropdown-button ${
                relationSelectorClass ? "success" : ""
              }`}
            >
              {relation}
            </button>
            <div className="dropdown-menu">
              <span onClick={handleRelationSelection}>Friends</span>
              <span onClick={handleRelationSelection}>Father</span>
              <span onClick={handleRelationSelection}>Grand Father</span>
              <span onClick={handleRelationSelection}>Sibling</span>
            </div>
          </div>
          <button
            className={`define-relation-button ${
              defineRelationClass ? "success" : ""
            }`}
            onClick={createRelation}
          >
            Define Relation
          </button>
        </div>
      </div>
    </>
  );
}

export default DefineRelation;

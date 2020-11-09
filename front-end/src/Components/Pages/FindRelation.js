import React, { useState } from "react";
import BackButton from "../BackButton";
import UserSearch from "../UserSearch";
import "./FindRelation.css";
import "./PageCommon.css";

function FindRelation(props) {
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const [path, setPath] = useState([]);
  const [foundPath, setFoundPath] = useState(false);
  const [curr, setCurr] = useState(0);

  let handleUpdateUser1 = (userObject) => {
    setFirstUser(userObject);
  };

  let handleUpdateUser2 = (userObject) => {
    setSecondUser(userObject);
  };

  let nextBox = () => {
    if (curr + 1 < path.length) {
      setCurr(curr + 1);
    }
  };

  let arrangeWithOrder = (users, order) => {
    let result = [];
    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (order[i] === users[j]._id) {
          result.push(users[j].name);
          break;
        }
      }
    }
    return result;
  };

  let prevBox = () => {
    if (curr - 1 >= 0) {
      setCurr(curr - 1);
    }
  };

  let findRelationUtil = () => {
    if (firstUser == null || secondUser === null) {
      return;
    }
    fetch("http://18.190.37.127/api/relation/find", {
      method: "POST",
      body: JSON.stringify({
        user1: firstUser,
        user2: secondUser,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        setFoundPath(true);
        setPath(arrangeWithOrder(obj.path, obj.orderIds));
      })
      .catch((err) => {});
  };

  return (
    <>
      <BackButton></BackButton>
      <div className="page-parent">
        <div className="page-panel">
          <img
            src="/find-relation.svg"
            alt="Define Relation"
            className="page-img"
          />
          <h2>Find Relation</h2>
          <UserSearch
            updateUser={handleUpdateUser1}
            placeholder="Find First User"
          ></UserSearch>
          <UserSearch
            updateUser={handleUpdateUser2}
            placeholder="Find Second User"
          ></UserSearch>
          <button className="find-relation-button" onClick={findRelationUtil}>
            Find Relation
          </button>
        </div>
      </div>
      <div className={`result ${foundPath ? "show" : ""}`}>
        <div className="result-box-parent">
          <img
            src="/left-arrow.svg"
            alt="Previous"
            className={`arrow ${curr > 0 ? "" : "arrow-inactive"}`}
            onClick={prevBox}
          />
          <div className="result-box">
            <img src="/avatar.svg" alt="Avatar" className="result-avatar" />
            <h2>{path[curr]}</h2>
          </div>
          <img
            src="/right-arrow.svg"
            alt="Next"
            className={`arrow ${
              curr < path.length - 1 ? "" : "arrow-inactive"
            }`}
            onClick={nextBox}
          />
        </div>
      </div>
    </>
  );
}

export default FindRelation;

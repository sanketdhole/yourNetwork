import React, { useState } from "react";
import BackButton from "../BackButton";
import "./CreateUser.css";
import "./PageCommon.css";

function CreateUser(props) {
  const [name, setName] = useState("");
  const [createButtonClass, setCreateButtonClass] = useState(0);

  let handleNameChange = (event) => {
    setName(event.target.value);
    setCreateButtonClass(0);
  };

  let createUser = () => {
    /*
        TODO : Submit the request to server and return result
      */
    let reqBody = {
      name: name.toLowerCase(),
    };
    fetch("http://localhost:5000/user/create", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Error creating user");
        }
        setCreateButtonClass(2);
        setName("");
      })
      .catch((err) => {
        setCreateButtonClass(1);
        console.log(err);
      });
  };

  return (
    <>
      <BackButton></BackButton>
      <div className="page-parent">
        <div className="page-panel">
          <img src="/create-user.svg" alt="Create User" className="page-img" />
          <h2>Create User</h2>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Name"
            className="create-user-input"
          />
          <button
            className={`create-user-button ${
              createButtonClass === 1 ? "failure" : ""
            }
              ${createButtonClass === 2 ? "success" : ""}`}
            onClick={createUser}
          >
            Create User
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateUser;

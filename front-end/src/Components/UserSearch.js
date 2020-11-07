import React, { useState } from "react";
import "./UserSearch.css";

function UserSearch(props) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("/search.svg");
  const [searchButtonClass, setSearchButtonClass] = useState(0);

  let handleNameChange = (event) => {
    setImageURL("/search.svg");
    setName(event.target.value);
    setSearchButtonClass(0);
  };

  let searchUser = () => {
    fetch(`http://localhost:5000/user/find?name=${name.toLowerCase()}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("No User Found");
        }
        setImageURL("/tick.svg");
        setSearchButtonClass(2);
        return res.json();
      })
      .then((user) => {
        props.updateUser(user);
      })
      .catch((err) => {
        setImageURL("/wrong.svg");
        setSearchButtonClass(1);
      });
  };

  return (
    <div className="search-panel">
      <input
        type="text"
        placeholder={props.placeholder}
        value={name}
        onChange={handleNameChange}
        className="search-input"
      />
      <button
        className={`search-button 
        ${searchButtonClass === 1 ? "failure" : ""} 
        ${searchButtonClass === 2 ? "success" : ""}`}
        onClick={searchUser}
      >
        <img src={imageURL} alt="Search Button" className="search-image" />
      </button>
    </div>
  );
}

export default UserSearch;

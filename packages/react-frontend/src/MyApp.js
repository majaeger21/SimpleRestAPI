// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json.users_list)) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(id, index) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((character) => character._id !== id); 
          setCharacters(updated);
        } else if (res.status === 404) {
          console.error("Resource not found.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => res.json())
      .then((json) => setCharacters([...characters, json])) // Use _id instead of id
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

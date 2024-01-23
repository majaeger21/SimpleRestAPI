// src/MyApp.js
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

  

  function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }

      function updateList(person) {
        // Check if the HTTP status code is 201
        if (person.status === 201) {
            setCharacters([...characters, person.data]);
        }
    }

    return (
    <div className="container">
        <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
    </div>
    );
  }


export default MyApp;
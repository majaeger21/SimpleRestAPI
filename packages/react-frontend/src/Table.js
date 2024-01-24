import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>ID</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    const catchDelete = () => {
      fetch(`http://localhost:8000/users/${row.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 204) {
            props.removeCharacter(index);
          } else if (res.status === 404) {
            console.log("Resource not found"); 
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>{row.id}</td>
        <td>
          <button onClick={catchDelete}>Delete</button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;

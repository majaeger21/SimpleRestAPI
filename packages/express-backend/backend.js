// backend.js
import express from "express";

const app = express();          // create an instance of Express
const port = 8000;              // a constant to represent the port number we'll use to listen to incoming HTTP requests
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(express.json());        // we set up our express app to process incoming data in JSON format

app.get("/users", (req, res) => {    // '/' is the URL pattern that will map to this endpoint
                                // process the request and send a response to the client that called the REST API
  res.send(users);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
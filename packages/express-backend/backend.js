// backend.js
import express from "express";
import cors from "cors";


const app = express();

const port = 8000;

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
        job: "Aspiring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const generateId = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let randomId = '';
    // Generate three random letters
    for (let i = 0; i < 3; i++) {
        randomId += letters[Math.floor(Math.random() * letters.length)];
    }
    // Generate three random numbers
    for (let i = 0; i < 3; i++) {
        randomId += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return randomId;
};

const addUser = (user) => {
    const similarId = generateId();
    user.id = similarId;

    users["users_list"].push(user);
    return user;

    // users["users_list"].push(user);
    // return user;
};

app.use(express.json());

app.use(cors());

// Specific route handler for "/users/:id" should come before the general "/users" handler
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

// Delete operation to remove a user by ID
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = users["users_list"].findIndex((user) => user["id"] === id);

    if (index !== -1) {
        const removedUser = users["users_list"].splice(index, 1)[0];
        res.status(204).send();
        // res.send(`User ID ${id} deleted`);
    } else {
        res.status(404).send("Resource not found");
    }
});

// Find user with given name and given job 
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name || job) {
        let result = users["users_list"];

        if (name) {
            result = findUserByName(name);
        }

        if (job) {
            result = result.filter((user) => user["job"] === job);
        }

        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

// Default route handler for the root path "/"
app.get("/", (req, res) => {
    res.json(users);
});

// Accept the json data that comes in and use it to create a new object in the list
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).json(userToAdd); // Returning the updated representation of the object
    //res.send();
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

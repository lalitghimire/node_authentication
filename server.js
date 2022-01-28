const express = require("express");
const app = express();

app.use(express.json());
const users = [];

// route for all users
app.get("/users", (req, res) => {
  res.json(users);
});

//route for posting a user
app.post("/users", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };
  console.log(user);
  users.push(user);
  res.status(201).send();
});

app.listen(3000);

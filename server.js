const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
const users = [];

// route for all users
app.get("/users", (req, res) => {
  res.json(users);
});

//route for posting a user
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // create hashed password using bcrypt
    const user = { name: req.body.name, password: hashedPassword }; // saving the hashed password instead of original
    users.push(user);
    res.status(201).send("success posting user");
  } catch {
    res.status(500).send("unsucessful creating user");
  }
});

app.listen(3000);

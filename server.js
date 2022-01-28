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
// route for login
app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("User not found");
  }
  //bcrypt used to compare the saved password with the send password
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Authentication successfull");
    } else {
      res.send("Authentication unsuccessful");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);

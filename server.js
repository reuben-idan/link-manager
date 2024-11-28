const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Mock database
const users = [];
const links = [];

// Register endpoint
app.post("/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  if (users.some((user) => user.username === username)) {
    return res.status(400).send("Username already exists");
  }
  users.push({ username, email, password });
  res.status(201).send("User registered");
});

// Login endpoint (mocked for simplicity)
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }
  res.status(200).send({ message: "Login successful" });
});

// Get public links by username
app.get("/:username", (req, res) => {
  const userLinks = links.filter(
    (link) => link.username === req.params.username
  );
  res.status(200).json(userLinks);
});

// Add a new link
app.post("/links", (req, res) => {
  const { username, title, url } = req.body;
  links.push({ username, title, url, id: links.length + 1 });
  res.status(201).send("Link added");
});

// Update an existing link
app.put("/links/:id", (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;
  const link = links.find((link) => link.id === parseInt(id));
  if (!link) {
    return res.status(404).send("Link not found");
  }
  link.title = title;
  link.url = url;
  res.status(200).send("Link updated");
});

// Delete a link
app.delete("/links/:id", (req, res) => {
  const { id } = req.params;
  const index = links.findIndex((link) => link.id === parseInt(id));
  if (index === -1) {
    return res.status(404).send("Link not found");
  }
  links.splice(index, 1);
  res.status(200).send("Link deleted");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

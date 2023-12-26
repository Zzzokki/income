const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");

const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const filePath = "src/data/users.json";

  const usersRaw = await fs.readFile(filePath, "utf8");

  const users = JSON.parse(usersRaw);

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });

  res.json({
    token,
  });
});

app.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;

  const filePath = "src/data/users.json";

  const usersRaw = await fs.readFile(filePath, "utf8");

  const users = JSON.parse(usersRaw);

  const user = users.find((user) => user.email === email);

  if (user) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const id = uuidv4();

  users.push({
    id,
    email,
    password,
  });

  await fs.writeFile(filePath, JSON.stringify(users));

  res.json({
    message: "User created",
  });
});

app.get("/users", async (req, res) => {
  const filePath = "src/data/users.json";

  const usersRaw = await fs.readFile(filePath, "utf8");

  const users = JSON.parse(usersRaw);

  res.json({
    users,
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

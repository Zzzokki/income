const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { connectDatabase } = require("./database");
const { User } = require("./model/user.model");

const SECRET_KEY = "secret-key";

const app = express();

connectDatabase();

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

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    token,
  });
});

app.get("/users", async (_req, res) => {
  const users = await User.find({ name: "hello" });

  res.json(users);
});

app.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;

  await User.create({
    name: "hello",
    email,
    password,
    updatedAt: new Date(),
    createdAt: new Date(),
  });

  res.json({
    message: "User created",
  });
});

app.post("/records", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(authorization, SECRET_KEY);

    const { email } = payload;

    const { category, amount, type } = req.body;

    const filePath = "src/data/records.json";

    const recordsRaw = await fs.readFile(filePath, "utf8");

    const records = JSON.parse(recordsRaw);

    records.push({
      type,
      category,
      amount,
      userEmail: email,
    });

    await fs.writeFile(filePath, JSON.stringify(records));

    res.json({
      message: "Record created",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

app.get("/records", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(authorization, SECRET_KEY);

    const { email } = payload;

    const filePath = "src/data/records.json";

    const recordsRaw = await fs.readFile(filePath, "utf8");

    const records = JSON.parse(recordsRaw);

    const usersRecords = records.filter((record) => record.userEmail === email);

    res.json({
      data: usersRecords,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

app.get("/categories", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(authorization, SECRET_KEY);

    const { email } = payload;

    const filePath = "src/data/categories.json";

    const categoriesRaw = await fs.readFile(filePath, "utf8");

    const categories = JSON.parse(categoriesRaw);

    const userCategories = categories.filter(
      (category) => category.userEmail === email
    );

    res.json({
      data: userCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

app.post("/categories", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(authorization, SECRET_KEY);

    const { email } = payload;

    const { name } = req.body;

    const filePath = "src/data/categories.json";

    const categoriesRaw = await fs.readFile(filePath, "utf8");

    const categories = JSON.parse(categoriesRaw);

    categories.push({
      name,
      userEmail: email,
    });

    await fs.writeFile(filePath, JSON.stringify(categories));

    res.json({
      message: "Category created",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

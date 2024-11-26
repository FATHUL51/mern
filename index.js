const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});

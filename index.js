const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/user", userRoute);
app.listen(PORT, () => {
  console.log("server started on port 3000");
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
});

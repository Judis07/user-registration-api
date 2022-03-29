require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.APP_PORT || 8000;

app.use(express.json());

mongoose
  .connect(process.env.DB_STRTING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("server is running on " + PORT));
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("User Registration Express API!!");
});

app.use(authRoutes);

// app.listen(PORT);

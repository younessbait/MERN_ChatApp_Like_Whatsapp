require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./sockethandler");
var auth = require("./routes/auth");
var account = require("./routes/account");
var createError = require("http-errors");
var mongoose = require("mongoose");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth/", auth);
app.use("/api/account/", account);

app.use((err, req, res, next) => {
  if (
    err.name === "MongoError" ||
    err.name === "ValidationError" ||
    err.name === "CastError"
  ) {
    err.status = 422;
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || "some error eccured" });
});

app.use((err, req, res, next) => {
  if (req.get("accept").includes("json")) {
    return next(createError(404));
  }
  res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
});

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log("Connected Successfully");
  } catch (err) {
    console.error("Connection Error:", err.message);
  }
}

connectToDatabase();
module.exports = app;
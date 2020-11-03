const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const userRouter = require("./api/users");
const relationRouter = require("./api/relationship");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/relation", relationRouter);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

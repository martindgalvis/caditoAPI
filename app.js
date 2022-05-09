const express = require("express");

// Routers
const userRouter = require("./src/v1/routes/user");
const postRouter = require("./src/v1/routes/post");
const cartRouter = require("./src/v1/routes/cart");

const app = express();

// Middlewares
app.use(express.json());

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/cart", cartRouter);

module.exports = app;

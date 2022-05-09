const express = require("express");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const postRouter = require("./post");
const cartRouter = require("./cart");
const saleRouter = require("./sale");

const router = express.Router({ mergeParams: true });

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/:id", userController.getUser);

router.use("/:userId/posts", postRouter);
router.use("/:userId/cart", cartRouter);
router.use("/:userId/history", saleRouter);

module.exports = router;

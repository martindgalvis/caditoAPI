const express = require("express");

const { protect, checkOwnership } = require("../controllers/auth");
const cartController = require("../controllers/cart");
const Cart = require("../models/cart");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, cartController.createCart)
  .get(protect, cartController.getUserCart);

router
  .route("/:id")
  .post(protect, checkOwnership(Cart), cartController.buyCart)
  .get(protect, checkOwnership(Cart), cartController.getCart);

module.exports = router;

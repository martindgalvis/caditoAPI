const express = require("express");

const { protect, checkOwnership } = require("../controllers/auth");
const saleController = require("../controllers/sale");

const router = express.Router({ mergeParams: true });

router.route("/").get(protect, saleController.getUserSales);

module.exports = router;

const factory = require("../utils/factory");

const Sale = require("../models/sale");

exports.getUserSales = factory.getAll(Sale);

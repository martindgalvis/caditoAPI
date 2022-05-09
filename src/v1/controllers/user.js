const factory = require("../utils/factory");

const User = require("../models/user");

exports.getUser = factory.getOne(User);

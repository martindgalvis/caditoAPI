const factory = require("../utils/factory");

const Review = require("../models/review");

exports.createReview = factory.createOne(Review);

exports.getAllReviews = factory.getAll(Review);

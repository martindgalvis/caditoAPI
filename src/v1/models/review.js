const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: false,
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    rate: {
      type: Number,
      required: [true, "Rate is required"],
      max: 5,
      min: 1,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

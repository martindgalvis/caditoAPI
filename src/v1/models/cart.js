const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: false,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "products",
    select: "-__v -user",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

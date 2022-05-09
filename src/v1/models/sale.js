const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    id: false,
    date: {
      type: Date,
      default: Date.now,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "A sale must have at least one product"],
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A sale must have a buyer"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

saleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "products",
    select: "price, name, description",
  });
  next();
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;

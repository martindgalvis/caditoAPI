const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    id: false,
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

postSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

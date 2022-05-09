const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    id: false,
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirmation is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

const User = mongoose.model("User", userSchema);

module.exports = User;

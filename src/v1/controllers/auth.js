const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const { username, password, passwordConfirm, name } = req.body;

    const newUser = await User.create({
      username,
      password,
      passwordConfirm,
      name,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Username and password are required",
    });
  }

  const user = await User.findOne({ username }).select("+password");
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect username or password",
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
};

exports.checkOwnership = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(
        res.status(404).json({
          status: "fail",
          message: `No document found`,
        })
      );
    }

    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (doc.user._id.toString() !== id) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Unauthorized",
        })
      );
    }
    next();
  } catch (err) {
    return next(
      res.status(400).json({
        status: "fail",
        message: "Server error",
      })
    );
  }
};

exports.getUserId = (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  return id;
};

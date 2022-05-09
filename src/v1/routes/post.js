const express = require("express");

const { protect, checkOwnership } = require("../controllers/auth");
const postController = require("../controllers/post");
const reviewRouter = require("./review");

const Post = require("../models/post");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getPost)
  .patch(protect, checkOwnership(Post), postController.updatePost);

router.use("/:postId/reviews", reviewRouter);

module.exports = router;

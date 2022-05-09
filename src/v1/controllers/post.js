const factory = require("../utils/factory");

const Post = require("../models/post");

exports.createPost = factory.createOne(Post);

exports.getPost = factory.getOne(Post, { path: "reviews" });

exports.getAllPosts = factory.getAll(Post);

exports.updatePost = factory.updateOne(Post);

exports.deletePost = factory.deleteOne(Post);

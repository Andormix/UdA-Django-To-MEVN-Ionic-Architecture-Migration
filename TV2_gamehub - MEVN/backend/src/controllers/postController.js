const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

async function listPosts(req, res, next) 
{
  try 
  {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ results: posts });

  } catch (error) 
  {
    return next(error);
  }
}

async function getPost(req, res, next) 
{
  try {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) 
    {
      return res.status(400).json({ message: "Invàlid postId" });
    }

    const post = await Post.findById(postId).populate("author", "username email");
    if (!post) 
    {
      return res.status(404).json({ message: "Post no trobat" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ post, comments });

  } catch (error) 
  {
    return next(error);
  }
}

async function createPost(req, res, next) 
{
  try 
  {
    const { title, body } = req.body;

    if (!title || !body) 
    {
      return res.status(400).json({ message: "Titol i body requerits" });
    }

    const post = await Post.create({
      title,
      body,
      author: req.user._id
    });

    const populatedPost = await Post.findById(post._id).populate("author", "username email");
    return res.status(201).json({ post: populatedPost });

  } catch (error) 
  {
    return next(error);
  }
}

async function updatePost(req, res, next) 
{
  try 
  {
    const { postId } = req.params;
    const { title, body } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) 
    {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const post = await Post.findById(postId);
    if (!post) 
    {
      return res.status(404).json({ message: "Post no trobat" });
    }

    if (post.author.toString() !== req.user._id.toString()) 
    {
      return res.status(403).json({ message: "hey! només pots editar els teus posts!" });
    }

    post.title = title ?? post.title;
    post.body = body ?? post.body;
    await post.save();

    const populatedPost = await Post.findById(post._id).populate("author", "username email");
    return res.status(200).json({ post: populatedPost });

  } catch (error) 
  {
    return next(error);
  }
}

async function deletePost(req, res, next) 
{
  try 
  {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) 
    {
      return res.status(400).json({ message: "Invàlid postId" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post no trobbat" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Només pots borrar els tous potst!" });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    return res.status(200).json({ message: "Post eliminat" });

  } catch (error) 
  {
    return next(error);
  }
}

module.exports = { listPosts, getPost, createPost, updatePost, deletePost };

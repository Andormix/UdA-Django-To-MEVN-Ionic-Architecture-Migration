const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

async function listCommentsByPost(req, res, next) 
{
  try 
  {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) 
    {
      return res.status(400).json({ message: "Invàlid postId" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ results: comments });
  } catch (error) 
  {
    return next(error);
  }
}

async function createComment(req, res, next) 
{
  try 
  {
    const { postId } = req.params;
    const { body } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) 
    {
      return res.status(400).json({ message: "Invàlid postId" });
    }
    if (!body) 
    {
      return res.status(400).json({ message: "body requerit" });
    }

    const post = await Post.findById(postId);

    if (!post) 
    {
      return res.status(404).json({ message: "Post not found soorry" });
    }

    const comment = await Comment.create({
      body,
      post: postId,
      author: req.user._id
    });

    const populatedComment = await Comment.findById(comment._id).populate("author", "username email");
    return res.status(201).json({ comment: populatedComment });
  } catch (error) 
  {
    return next(error);
  }
}

async function deleteComment(req, res, next) 
{
  try 
  {
    const { commentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(commentId)) 
    {
      return res.status(400).json({ message: "Invàlid commentId" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) 
    {
      return res.status(404).json({ message: "Comentari no trobat" });
    }

    const isCommentAuthor = comment.author.toString() === req.user._id.toString();
    if (!isCommentAuthor) 
    {
      return res.status(403).json({ message: "Només pots eliminar els teus comentaris!" });
    }

    await comment.deleteOne();
    return res.status(200).json({ message: "Commentari eliminat" });

  } catch (error) 
  {
    return next(error);
  }
}

module.exports = { listCommentsByPost, createComment, deleteComment };

const express = require("express");
const { listPosts, getPost, createPost, updatePost, deletePost } = require("../controllers/postController");
const { listCommentsByPost, createComment } = require("../controllers/commentController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", listPosts); // Ver todos los posts
router.get("/:postId", getPost); // Ver un post concreto
router.post("/", requireAuth, createPost);
router.put("/:postId", requireAuth, updatePost);
router.delete("/:postId", requireAuth, deletePost);

router.get("/:postId/comments", listCommentsByPost);
router.post("/:postId/comments", requireAuth, createComment);

module.exports = router;

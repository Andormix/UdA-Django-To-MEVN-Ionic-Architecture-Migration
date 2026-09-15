const express = require("express");
const { deleteComment } = require("../controllers/commentController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.delete("/:commentId", requireAuth, deleteComment);

module.exports = router;

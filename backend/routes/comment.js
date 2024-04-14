const express = require("express");
const router = express.Router({mergeParams: true});
const {
    createComment,
    getAllCommentsByForumId,
    deleteComment
} = require("../controllers/comment");

router.get("/", getAllCommentsByForumId);
router.post("/", createComment);
router.delete("/:commentId", deleteComment);

module.exports = router;

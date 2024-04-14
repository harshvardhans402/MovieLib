const Comment = require("../models/comment");
const Forum = require("../models/forum");

const createComment = (req, res) => {
    Comment.create(req.body)
        .then((newComment) => {
            Forum.findById(req.params.id)
                .then((forum) => {
                    forum.comments.push(newComment);
                    forum.save();
                    res.json(newComment);
                })
                .catch((err) =>
                    res
                        .status(404)
                        .json({ message: "Comment not added, Forum not found", error: err.message })
                )
        })
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add comment", error: err.message })
        );
}

const getAllCommentsByForumId = (req, res) => {

    Forum.findById(req.params.id).
        populate('comments').
        exec(function (err, forum) {
            if (err)
                res
                    .status(404)
                    .json({ message: "Failed to fetch comments, forum not found ", error: err.message });
            else
                res.send(forum.comments);
        });
};

const deleteComment = (req, res) => {
    // First, delete the comment
    Comment.findByIdAndRemove(req.params.commentId)
        .then((deletedComment) => {
            // Check if the comment was found and deleted
            if (!deletedComment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            // If the comment was deleted, update the corresponding forum document
            Forum.findOneAndUpdate(
                { comments: req.params.commentId }, // Find the forum document containing the comment ID
                { $pull: { comments: req.params.commentId } }, // Remove the comment ID from the array
                { new: true } // Return the updated forum document
            )
                .then((updatedForum) => {
                    // Check if the forum was found and updated
                    if (!updatedForum) {
                        return res.status(404).json({ message: "Forum not found" });
                    }
                    // Send a success response
                    res.status(202).json({ message: "Comment deleted successfully", deletedComment });
                })
                .catch((error) => {
                    // Handle errors during forum update
                    console.error("Error updating forum:", error);
                    res.status(500).json({ message: "Error updating forum", error: error.message });
                });
        })
        .catch((error) => {
            // Handle errors during comment deletion
            console.error("Error deleting comment:", error);
            res.status(500).json({ message: "Error deleting comment", error: error.message });
        });
};


module.exports = {
    createComment,
    getAllCommentsByForumId,
    deleteComment
}
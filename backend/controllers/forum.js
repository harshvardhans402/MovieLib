const Forum = require("../models/forum");

const getAllForums = (req, res) => {
    Forum.find()
        .then((forums) => res.json(forums))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Forum not found", error: err.message })
        );
};

const getForumById = (req, res) => {
    Forum.findById(req.params.id)
    .populate('comments')
    .exec(function (err, forum) {
        if (err)
            res
                .status(404)
                .json({ message: "Forum not found ", error: err.message });
        else
            res.send(forum);
    });
};

const createForum = (req, res) => {
    Forum.create(req.body)
        .then((data) => res.json({ message: "Forum added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add forum", error: err.message })
        );
};

const updateForum = (req, res) => {
    Forum.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "Forum updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update forum", error: err.message })
        );
};

const deleteForum = (req, res) => {
    Forum.findByIdAndRemove(req.params.id)
        .then((data) =>
            res
            .status(202)
            .json({ message: "Forum deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Forum not found", error: err.message })
        );
};

module.exports = {
    getAllForums,
    getForumById,
    createForum,
    updateForum,
    deleteForum,
};
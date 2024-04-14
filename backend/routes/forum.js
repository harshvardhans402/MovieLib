const express = require("express");
const router = express.Router();
const {
    getAllForums,
    getForumById,
    createForum,
    updateForum,
    deleteForum
} = require("../controllers/forum");

router.get("/", getAllForums);
router.get("/:id", getForumById);
router.post("/", createForum);
router.put("/:id", updateForum);
router.delete("/:id", deleteForum);

module.exports = router;
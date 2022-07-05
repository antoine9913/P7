const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/commentCtrl");

//Comments
router.post("/:id/comment", commentCtrl.createComment);
router.get("/:id/comment", commentCtrl.getAllComment);
router.delete("/:id/comment", auth, commentCtrl.deleteComment);

module.exports = router;
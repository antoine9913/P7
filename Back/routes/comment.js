const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/commentCtrl");

//Comments
router.post("/:id/comment", auth, commentCtrl.createComment);
router.delete("/:id/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
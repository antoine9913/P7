const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/postCtrl");

// CRUD Routes
router.post("/create", auth, multer, postCtrl.create);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/update/:id", auth, multer, postCtrl.update);
router.delete("/delete/:id", auth, postCtrl.delete);

//Likes
router.post("/:id/like", auth, postCtrl.addLike);
router.get("/:id/like", auth, postCtrl.getAllLikes);
router.delete("/:id/like", auth, postCtrl.removeLike);

module.exports = router;
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");
const postCtrl = require("../controllers/postCtrl");

// CRUD Routes
router.post("/create", auth, upload.single("file"), postCtrl.create);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/update/:id", upload.single("file"), postCtrl.update);
router.delete("/:id/delete/:id", auth, postCtrl.delete);

module.exports = router;

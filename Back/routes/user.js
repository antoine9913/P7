const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer-config");

// CRUD Routes
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/profile/:id", auth, userCtrl.getUserProfile);
router.put("/profile/:id", upload.single('file'), userCtrl.updateProfile);
router.delete("/profile/:id", auth, userCtrl.deleteProfile);

module.exports = router;
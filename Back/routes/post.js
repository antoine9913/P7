const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postCtrl');

router.post('/new', postCtrl.createPost);
router.get('/', postCtrl.listPost);

module.exports = router;
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

router.delete('/delete', auth, userCtrl.deleteCurrentUser);

module.exports = router;
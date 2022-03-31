const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/authCtrl');
const auth = require('../middlewares/auth');

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/user', auth, authCtrl.getCurrentUser);

module.exports = router;
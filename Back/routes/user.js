const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

router.post('/signup', userCtrl.signup);
router.post('/login' , userCtrl.login);
router.get('/profil' , auth, userCtrl.getCurrentUser);
// router.put('/update' , auth,userCtrl.updateUserProfile);
router.delete('/delete', auth, userCtrl.deleteCurrentUser);

module.exports = router;
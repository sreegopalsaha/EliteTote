const express = require('express');
const router = express.Router();
const {loginUser, registerUser, logoutUser} = require('../controllers/userController');
const upload = require('../configs/multerConfig');

router.get('/', (req, res)=>{
    res.send('This is user router');
});

router.post('/login', loginUser);
router.post('/register', upload.single('image'), registerUser);
router.get('/logout', logoutUser);

module.exports = router;
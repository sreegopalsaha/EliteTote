const express = require('express');
const router = express.Router();
const {loginAdmin, registerAdmin, logoutAdmin} = require('../controllers/adminController');
const { isAdminLoggedIn } = require('../middlewares/isLoggedIn');
const upload = require('../configs/multerConfig');

router.get('/', isAdminLoggedIn, (req, res)=>{
    res.send('This is admin router');
});

router.post('/login', loginAdmin);
router.post('/register', upload.single('image'), registerAdmin);
router.get('/logout', logoutAdmin);


module.exports = router;
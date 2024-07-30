const express = require('express');
const router = express.Router();
const {loginAdmin, registerAdmin, logoutAdmin} = require('../controllers/adminController');

router.get('/', (req, res)=>{
    res.send('This is admin router');
});

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.get('logout', logoutAdmin);


module.exports = router;
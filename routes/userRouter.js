const express = require('express');
const router = express.Router();
const {loginUser, registerUser, logoutUser} = require('../controllers/userController');
const upload = require('../configs/multerConfig');
const { isUserLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/user.model');

router.get('/', (req, res)=>{
    res.send('This is user router');
});

router.post('/login', loginUser);
router.post('/register', upload.single('image'), registerUser);
router.get('/logout', logoutUser);

router.get('/addcart/:productId', isUserLoggedIn, async (req, res)=>{
    let user = await userModel.findById(req.user.id);
    user.cart.push(req.params.productId);
    await user.save();
    res.redirect('/home');
});

router.get('/cart', isUserLoggedIn, async(req, res)=>{
    const user = await userModel.findById(req.user.id).populate('cart');
    res.render('cart', {products: user.cart});
});

module.exports = router;
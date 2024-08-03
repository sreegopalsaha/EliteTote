const express = require('express');
const router = express.Router();
const {loginAdmin, registerAdmin, logoutAdmin} = require('../controllers/adminController');
const { isAdminLoggedIn } = require('../middlewares/isLoggedIn');
const upload = require('../configs/multerConfig');
const productModel = require('../models/product.model');

router.get('/', isAdminLoggedIn, (req, res)=>{
    res.redirect('/admin/home');
});

router.post('/login', loginAdmin);
router.post('/register', upload.single('image'), registerAdmin);
router.get('/logout', logoutAdmin);

router.get('/home', isAdminLoggedIn, async (req, res)=>{
    let products = await productModel.find();
    res.render('adminHome', {products});
});

router.get('/create', isAdminLoggedIn, async (req, res)=>{
    res.render('createProduct');
});

router.get('/update/:productId', isAdminLoggedIn, async (req, res)=>{
    let product = await productModel.findOne({_id:req.params.productId});
    res.send(product);
});

module.exports = router;
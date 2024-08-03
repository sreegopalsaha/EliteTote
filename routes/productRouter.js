const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const { isAdminLoggedIn } = require('../middlewares/isLoggedIn');
const upload = require('../configs/multerConfig');

router.get('/', (req, res) => {
    res.send('This is product router');
});

router.post('/create', isAdminLoggedIn, upload.single('productImg'), async (req, res) => {
    const { name, price, textcolor, bgcolor, panelcolor, discount } = req.body;
    let product = await productModel.create({
        name,
        image: req.file.filename,
        price,
        textcolor,
        bgcolor,
        panelcolor,
        discount
    });
    res.redirect('/admin');
});

router.post('/update/:productId', isAdminLoggedIn, upload.single('productImg'), async (req, res) => {
    const { name, price, textcolor, bgcolor, panelcolor, discount } = req.body;
    const updateData = {
        name,
        price,
        textcolor,
        bgcolor,
        panelcolor,
        discount
    };
    // If a new image is uploaded, update the image as well
    if (req.file) {
        updateData.image = req.file.filename;
    }
    await productModel.findByIdAndUpdate(req.params.productId, updateData);
    res.redirect('/admin');
});

router.get('/delete/:productId', isAdminLoggedIn, async (req, res) => {
    const product = await productModel.findByIdAndDelete(req.params.productId);
    if (product) {
        return res.redirect('/admin/home');
    } else{
        res.send("Product not found");
    }
});

module.exports = router;
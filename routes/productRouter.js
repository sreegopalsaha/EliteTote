const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const {isAdminLoggedIn} = require('../middlewares/isLoggedIn');
const upload = require('../configs/multerConfig');

router.get('/', (req, res)=>{
    res.send('This is product router');
});

router.post('/create', isAdminLoggedIn, upload.single('productImg'), async (req, res)=>{
    const { name, image, price, textcolor, bgcolor, panelcolor, discount} = req.body;
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

module.exports = router;
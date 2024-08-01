const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db = require('./configs/mongooseConnection');
const productModel = require('./models/product.model');
const path = require('path');
const staticPath = path.join(__dirname, 'public');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(staticPath));
app.use(cookieParser());
app.set('view engine', 'ejs');

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const adminRouter = require('./routes/adminRouter');
const { isUserLoggedIn } = require('./middlewares/isLoggedIn');


app.get('/', isUserLoggedIn, (req, res)=>{
    res.redirect('/home');
});

app.get('/home', isUserLoggedIn, async (req, res)=>{
    let products = await productModel.find();
    res.render('home', {products});
})

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

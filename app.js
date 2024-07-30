const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db = require('./configs/mongooseConnection');
const path = require('path');
const staticPath = path.join(__dirname, 'public');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(staticPath));
app.set('view engine', 'ejs');

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const adminRouter = require('./routes/adminRouter');


app.get('/', (req, res)=>{
    res.send('Hello from the server!');
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

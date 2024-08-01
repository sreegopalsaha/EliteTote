const jwt = require('jsonwebtoken');

const isUserLoggedIn = (req, res, next)=>{
    const token = req.cookies.userToken;
    if(!token){
        return res.render('index');
    }
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
}
const isAdminLoggedIn = (req, res, next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return res.render('adminLogin');
    }
    const admin = jwt.verify(token, process.env.JWT_KEY);
    req.admin = admin;
    next();
}

module.exports = {isUserLoggedIn, isAdminLoggedIn}
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const {getToken} = require('../utils/getToken');

module.exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        return res.send('Account not found');
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(!result){
            return res.send('password is incorrect');
        }
        const token = getToken(user);
        res.cookie('userToken', token);
        return res.send('Login successfully');

    });
    
};

module.exports.registerUser = async (req, res)=>{
    const { fullname, email, password, picture } = req.body;
    let user = await userModel.findOne({email});
    if(user){
        return res.status(409).send('You already have an account');
    }
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, async (err, hash) =>{
            user =  await userModel.create({
                fullname,
                email,
                password: hash,
                picture
            });
            const token = getToken(user);
            res.cookie('userToken', token);
            return res.send(user);
        });
    });
    


};

module.exports.logoutUser = (req, res)=>{
    res.clearCookie('userToken');
    return res.send('Logged out successfully');
};
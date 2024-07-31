const adminModel = require('../models/admin.model');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/getToken');

module.exports.loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    let admin = await adminModel.findOne({email});
    if(!admin){
        return res.send('Account not found');
    }
    bcrypt.compare(password, admin.password, function(err, result) {
        if(!result){
            return res.send('Password incorrect');
        }
        const token = getToken(admin);
        res.cookie('adminToken', token);
        return res.send('Log in successfull');
    });


};

module.exports.registerAdmin = async (req, res) => {
    let admin = await adminModel.find();
    if (admin.length >0 ) {
        return res.send('You dont have permission have to create another admin account');
    }

    const { fullname, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            admin = await adminModel.create({
                fullname,
                email,
                password: hash,
                picture:  req.file ? req.file.filename : 'default.png'
            });
            const token = getToken(admin);
            res.cookie('adminToken', token);
            res.send(admin);
        });
    });
};

module.exports.logoutAdmin = (req, res) => {
    res.clearCookie('adminToken');
    return res.send('Logged out successfully');
};
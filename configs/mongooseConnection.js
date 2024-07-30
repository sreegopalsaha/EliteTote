const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log('Database connected');
})
.catch((e)=>{
    console.log(e);
});

module.exports = mongoose.connection;

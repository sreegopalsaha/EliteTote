const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.send('Hello from the server!');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

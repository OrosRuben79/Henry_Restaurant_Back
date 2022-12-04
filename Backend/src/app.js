const express = require('express');


const server = express();


server.use('/api', (req,res)=>{
    res.json({msg: "hola en la ruta"})
})

module.exports = server;
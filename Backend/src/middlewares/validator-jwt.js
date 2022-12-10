const jwt = require('express');
const User = require('../models/user');

const validateJWT = async(req,res,next)=>{

    const token = req.header('token')
    if( !token){
        return res.status(400).json({
            msg: 'Not token'
        })
    }
    try {
        
        const {_id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(_id);

        if(!user){
            res.status(400).json({
                msg: 'Token invalid'
            })
        }
        if(!user.state){
            
        }

    } catch (error) {
        
    }
}

module.exports= {validateJWT}

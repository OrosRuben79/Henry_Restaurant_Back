
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req,res,next)=>{
    console.log(req.body)
    const {token} = req.body
    if( !token){
        return res.status(400).json({
            msg: 'Not token'
        })
    }
    try {
        
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(id);

        if(!user){
            res.status(400).json({
                msg: 'Token invalid'
            })
        }
        // verify if user state are true
        if(!user.state){
            return res.status(401).json({
                msg: 'Token invalid'
            })
        }
        req.user = user
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports= {validateJWT}

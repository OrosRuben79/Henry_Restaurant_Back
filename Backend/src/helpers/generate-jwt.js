const jwt = require('jsonwebtoken')

const generateJWT = ( id = '' ) =>{

    return new Promise( (resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '30d'
        }, ( err, token ) => {

            if(err){
                console.log(err);
                reject('failed to generate token')
            } else{
                resolve( token );
            }
        })

    })
}

const verifyToken = (token) => {
	try {
		const validate = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
		return validate
	} catch (error) {
		return false
	}
}

module.exports = {
    generateJWT,
		verifyToken
}



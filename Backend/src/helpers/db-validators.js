const User = require('../models/user')

const existsEmail = async( email = '') => {


    // check if email exists
    const existsEmail = await User.findOne({ email });
    if ( existsEmail ){
        throw new Error(`Email are registred!! are need unique`)
    }
}

const existsUserById = async( id ) => {


   // check if id exists
    const existsUserByrId = await User.findById(id);
    if ( !existsUserByrId ){
        throw new Error(`id dont exist: ${ id }`)
    }
}

module.exports = {
    existsEmail,
    existsUserById
}
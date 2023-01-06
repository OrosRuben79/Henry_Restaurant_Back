const User = require('../models/user')
const Food = require('../models/food')

const existsEmail = async( email = '') => {


    // check if email exists
    const existsEmail = await User.findOne({ email });
    if ( existsEmail ){
        throw new Error(`Email are registred!! are need unique`)
    }
}
const scoreValidator = async( score = '') => {

    if ( score < 1 || score>5 ){
        throw new Error(`El score deve ser entre 1 y 5`)
    }
}

const userIDValidator = async( userId = '') => {
    const user = await User.findById(userId)
    if (!user ){
        throw new Error(`El usuario no existe`)
    }
}

const foodIDValidator = async( foodId = '') => {
    const food = await Food.findById(foodId)
    if (!food ){
        throw new Error(`Comida no existe`)
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
    existsUserById,
    scoreValidator,
    userIDValidator,
    foodIDValidator
}
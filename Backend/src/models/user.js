
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    fullName: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VIP_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
		thirdAuth: {
			type: String,
		},
    registerDate: {
        type: Date,
        default: Date.now
    },
    country:{
        type: String
    },
		city:{
			type: String
		},
		address: {
			type: String
		}
});


module.exports = model( 'User', UserSchema );
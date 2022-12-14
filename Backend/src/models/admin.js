const {Schema, model } = require('mongoose');

const AdminSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'VIP_ROLE', 'WAITER_ROLE', 'COOK_ROLE', 'CASHIER_ROLE']
    },
    img: {
        type: String
    },
    country:{
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },

});

module.exports = model('Admin', AdminSchema);


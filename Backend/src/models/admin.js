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

});

module.exports = model('Admin', AdminSchema);


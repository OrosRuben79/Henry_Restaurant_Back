const {Schema, model } = require('mongoose');

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },


});


module.exports = model('Admin', AdminSchema);











adminName
"kossito"
password
"fdgfrherher568484wfef"
status
true
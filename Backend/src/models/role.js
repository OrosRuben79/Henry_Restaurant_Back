const {Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
});

module.exports = model('Role', RoleSchema);
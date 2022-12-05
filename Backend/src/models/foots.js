const {Schema, model } = require('mongoose');

const FootSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        uppercase: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'types',
        required: true
    },
    lenguage:{
        es:{
           nombre:{type: String},
           tipo:{ref: 'types'},
           descripcion: { type: String },
        },
        en:{
            name:{type: String},
            type:{ref: 'types'},
            description: { type: String },

        }

    },
    description: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }


});



module.exports = model('Foot', FootSchema);
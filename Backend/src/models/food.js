const {Schema, model } = require('mongoose');

const FoodSchema = Schema({
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
    price: {
        type: Number,
        default: 0
    },
    type: {
        // type: Schema.Types.ObjectId,
        type: String,
        // ref: 'types',
        required: true
    },
    // lenguage:{
    //     es:{
    //        nombre:{type: String},
    //        tipo:{ref: 'types'},
    //        descripcion: { type: String },
    //     },
    //     en:{
    //         name:{type: String},
    //         type:{ref: 'types'},
    //         description: { type: String },

    //     }

    // },
    description: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }


});



module.exports = model('Food', FoodSchema);
const { Schema, model } = require('mongoose');

const FoodSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la comida es obligatorio'],
        unique: true,
        uppercase: true,
    },
    id:{
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true, 
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    type: {
        // type: Schema.Types.ObjectId,
        // ref: 'types',
        type: String,
        required: true
    },
    // lenguage:{
    //         es:{
    //            nombre:{type: String},
    //            tipo:{ref: 'types'},
    //            descripcion: { type: String },
    //         },
    //         en:{
    //             name:{type: String},
    //             type:{ref: 'types'},
    //             description: { type: String },
    
    //         }
    // },
    description: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }


});



module.exports = model('Food', FoodSchema);
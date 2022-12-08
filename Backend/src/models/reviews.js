const {Schema, model } = require('mongoose');

const ReviewSchema = Schema({
    rating: {
        type: Number,
        default: 0
    },

    review: {
        type: String,
        required: [true, 'La reseña es obligatoria']
    }
});

module.exports = model('Reviews', ReviewSchema);
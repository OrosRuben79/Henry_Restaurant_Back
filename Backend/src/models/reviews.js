const {Schema, model } = require('mongoose');

const ReviewsSchema = Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
       // required: true,
      },
    reviewsDate: {
        type: Date,
        required: true
    },
    reviews: {
        type: String,
        required: true,
        enum:['EXCELENTE', 'MUY BUENO', 'BUENO', 'REGULAR', 'INSUFICIENTE']
    },
    score: {
        type: Number,
        required: true,
    },
    descriptions: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
});

module.exports = model('Reviews', ReviewsSchema);
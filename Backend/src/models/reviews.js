const {Schema, model } = require('mongoose');

const ReviewsSchema = Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
       // required: true,
      },
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

module.exports = model('Reviews', ReviewsSchema);
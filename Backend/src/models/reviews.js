const { Schema, model } = require("mongoose");

const ReviewsSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  foodId: {
    type: Schema.Types.ObjectId,
    ref: "Food",
  },
  reviewsDate: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  descriptions: {
    type: String,
  },
  positve: { type: Boolean },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("Reviews", ReviewsSchema);

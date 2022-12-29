const { Schema, model } = require("mongoose");

const FoodSchema = Schema({
  adminid: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  reviewid: [
    {
        type: Schema.Types.ObjectId,
        ref: "Reviews",
        required: true,
    },
],
  price: {
    type: Number,
    default: 0,
  },
  lenguage: {
    es: {
        name: {
          type: String,
          required: [true, "El nombre de la comida es obligatorio"],
          unique: true,
          uppercase: true,
        },
        type: {
              type: String,
              required: true
          },
        descripcion: { type: String },
    },
    en: {
        name: {
            type: String,
            required: [true, "El nombre de la comida es obligatorio"],
            unique: true,
            uppercase: true,
          },
          type: {
                type: String,
                required: true
            },
          descripcion: { type: String },
    },
  },
  disponible: { type: Boolean, default: true },
  img: { type: String },
});

module.exports = model("Food", FoodSchema);

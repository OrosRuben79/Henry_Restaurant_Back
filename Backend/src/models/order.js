const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
   // required: true,
  },
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    },
  ],
  typepedido: {
    type: String,
    required: true,
    enum: ["LOCAL", "DELIVERY"],
  },
  table: {
    type: Number,
  },
  direccion: {
    type: String,
  },
  stateOrder: {
    type: String,
    enum: ["TERMINADO", "ENPROCESO", "RECHAZADO"],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("Order", OrderSchema);

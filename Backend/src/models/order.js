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
  typeOrder: {
    type: String,
    required: true,
    enum: ["LOCAL", "DELIVERY", "RESERVATION"],
  },
  table: {
    type: Number,
  },
  address: {
    type: String,

  },
  stateOrder: {
    type: String,
    enum: ["FINISH", "IN PROCESS", "REJECT", "DISPATCHED"],
    default: "IN PROCESS",

  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
	valuePaid: {
		type: Number,
	},
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = model("Order", OrderSchema);

const { Schema, model } = require("mongoose");

const TagSchema = Schema({

    // en: {
    //     type: String,

    //     required: true,
    // },
    // es: {
    //     type: String,
    //     required: true,
    // },

    tagEN:{
        type: String,
        required: true,
    },
    tagES:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
      },

});

module.exports = model("Tag", TagSchema);

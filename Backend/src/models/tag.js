const { Schema, model } = require("mongoose");

const TagSchema = Schema({

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

});

module.exports = model("Tag", TagSchema);

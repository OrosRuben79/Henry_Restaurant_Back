const { Schema, model } = require("mongoose");

const TagSchema = Schema({

    en: {
        type: String,
        required: true,
    },
    es: {
        type: String,
        required: true,
    },
});

module.exports = model("Tag", TagSchema);

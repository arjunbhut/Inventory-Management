const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    limit: {
        type: Number
    }

});

module.exports = mongoose.model('Items',itemSchema);
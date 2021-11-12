const mongoose = require('mongoose');
const {Schema} = mongoose;
const categories = require('./categories');

const Products = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        min: 0,
        default: 0,
    },
    category: {
        type: String,
    }
});

module.exports=mongoose.model('Products', Products);
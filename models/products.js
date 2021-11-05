const mongoose = require('mongoose');
const {Schema} = mongoose;
const categories = require('./categories');

const Products = new Schema({
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
        type: categories,
    }
});

module.exports=mongoose.model('Products', Products);
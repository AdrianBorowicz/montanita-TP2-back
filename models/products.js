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
        required: true
    },
    price: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: true,
    }
});

module.exports=mongoose.model('Products', Products);
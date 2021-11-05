const mongoose = require('mongoose');
const {Schema} = mongoose;

//quiero señalar que ITEM tiene un PRODUCTO. Como se hace?
const products = require('./products')

const Items = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: products,
        required: true,
    }
});

module.exports=mongoose.model('Items', Items);
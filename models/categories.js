const mongoose = require('mongoose');
const { getEnabledCategories } = require('trace_events');
const {Schema} = mongoose;

const Category = new Schema({
    name: {
        type: String,
        required: true,
    },
},
{
    collection: 'categories'
});

module.exports=mongoose.model('Category', Category);
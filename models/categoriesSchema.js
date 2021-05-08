const mongoose = require('mongoose')
var CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    createTime:{
        type: String,
        required: true,
        trim: true
    },
    updateTime:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
    productIds: [],
});
var CategoryModel = mongoose.model('category',CategorySchema)

module.exports = CategoryModel;
const mongoose = require('mongoose')
var ProductSchema = new mongoose.Schema({
    picture:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    ammount:{
        type: Number,
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
    }
});
var ProductModel = mongoose.model('product',ProductSchema)

module.exports = ProductModel;
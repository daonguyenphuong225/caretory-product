const mongoose = require('mongoose')
var CategorySchema = new mongoose.Schema({
    name:{
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
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
var CategoryModel = mongoose.model('category',CategorySchema)

module.exports = CategoryModel;
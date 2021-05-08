const ProductModel = require('../models/productSchema');

exports.getList = function (req, res) {
    res.render('product.ejs')
}

exports.getCreateForm = function (req, res) {
    res.render('productCreate.ejs')
}

exports.create = function(req,res){
    var product = new ProductModel(req.body);
    product.save(function(err){
        if(err){
            return res.status(500).send(err);
        }else{
            return res.redirect('/product-list')
        }
    })
}
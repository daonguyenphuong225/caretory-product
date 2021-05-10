const ProductModel = require('../models/productSchema');

exports.getList = function (req, res) {
   
    ProductModel.find({})
        .then(function (data) {
            let products = {
                products: data
            }
            res.render('product.ejs',products)
        })
        .catch(function (err) {
            console.log(err);
        })
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

exports.deleteProduct = function (req, res) {
    ProductModel.deleteOne({ _id: req.params.id })
        .then(function () {
            return res.redirect('/product-list')
        })
        .catch(function (err) {
            console.log(err);
        })
}
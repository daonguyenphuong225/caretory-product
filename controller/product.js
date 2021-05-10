const ProductModel = require('../models/productSchema');

exports.getList = function (req, res) {
    let arrange = {}
    if(req.query.arrange == 0){
        arrange = {"name":1}
    }
    if(req.query.arrange == 1){
        arrange = {"created_at":1}
    }
    if(req.query.arrange == 2){
        arrange = {"created_at":-1}
    }
    if(req.query.arrange == 3){
        arrange = {"price":1}
    }
    if(req.query.arrange == 4){
        arrange = {"price":-1}
    }
    ProductModel.find({}).sort(arrange) 
        .then(function (data) {
            let products = {
                products: data
            }
            res.render('product.ejs', products)
        })
        .catch(function (err) {
            console.log(err);
        })
}

exports.getCreateForm = function (req, res) {
    res.render('productCreate.ejs')
}

exports.create = function (req, res) {
    var product = new ProductModel(req.body);
    product.save(function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
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

exports.seacrchCategory = function (req, res) {
    let name = req.query.name
    let status = req.query.status
    if (name == '') {
        CategoryModel.find({ status: req.query.status })
            .then(function (data) {
                let categories = {
                    categories: data
                }
                res.render('./search/category.ejs', categories)
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    if (status == "") {
        CategoryModel.find({ name: { '$regex': req.query.name } })
            .then(function (data) {
                let categories = {
                    categories: data
                }
                res.render('./search/category.ejs', categories)
            })
            .catch(function (err) {
                console.log(err);
            })
    } else {
        CategoryModel.find({
            name: { '$regex': req.query.name },
            status: req.query.status
        })
            .then(function (data) {
                let categories = {
                    categories: data
                }
                res.render('./search/category.ejs', categories)
            })
            .catch(function (err) {
                console.log(err);
            })
    }


}

exports.updateForm = function (req, res) {
    let id = req.params.id
    ProductModel.find({ _id: id })
        .then(function (data) {
            let products = {
                products: data
            }
            res.render('./update/productUpdate.ejs', products)
        })
        .catch(function (err) {
            console.log(err);
        })


}

exports.update = function (req, res) {
    ProductModel.updateOne(
        { _id: req.body.id },
        {
            picture: req.body.picture,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            ammount: req.body.ammount,
            status: req.body.status,

        })
        .then(function () {
            return res.redirect('/product-list')
        })
        .catch(function (err) {
            console.log(err);
        })
}

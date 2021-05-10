const CategoryModel = require('../models/categoriesSchema')

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
        CategoryModel.find({}).sort(arrange) 

        .then(function (data) {
            let categories = {
                categories: data
            }
            res.render('category.ejs', categories)
        })
        .catch(function (err) {
            console.log(err);
        })
}
exports.getCreateForm = function (req, res) {
    res.render('categoryCreate.ejs')
}

exports.create = function (req, res) {
    var category = new CategoryModel(req.body);
    category.save(function (err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.redirect('/category-list')
        }
    })
}
exports.deleteCategory = function (req, res) {
    CategoryModel.deleteOne({ _id: req.params.id })
        .then(function () {
            return res.redirect('/category-list')
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
    if (status == "" ) {
        CategoryModel.find({ name: {'$regex': req.query.name}})
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
    CategoryModel.find({_id: id})
        .then(function (data) {
            let categories = {
                categories: data
            }
            res.render('./update/categoryUpdate.ejs', categories)
        })
        .catch(function (err) {
            console.log(err);
        })
    

}

exports.update = function (req, res) {
    CategoryModel.updateOne(
        { _id: req.body.id },
        {
            name: req.body.name,
            status: req.body.status,
            productIds:req.body.productIds,
        })
        .then(function () {
            res.redirect('/category-list')
        })
        .catch(function (err) {
            console.log(err);
        })
}

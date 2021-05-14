const CategoryModel = require('../models/categoriesSchema')
const dayjs = require('dayjs')
const {fullTextSearch} = require('../until/until')

exports.getList = function (req, res) {
    let {name, status, sort} = req.query
    

    if (sort == 0) {
        sort = { "name": 1 }
    }
    if (sort == 1) {
        sort = { "created_at": 1 }
    }
    if (sort == 2) {
        sort = { "created_at": -1 }
    }

    let match = {}

    if (name) {
        match.name = fullTextSearch(name) 
    }

    if (status) {
        match.status = status
    }

    CategoryModel.find(match).sort(sort)

        .then(function (data) {
            let rs = {
                categories: data,
                match: req.query,
                dayjs: dayjs,
            }
            res.render('category.ejs', rs)
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


exports.update = function (req, res) {
    CategoryModel.updateOne(
        { _id: req.body.id },
        {
            name: req.body.name,
            status: req.body.status,
        })
        .then(function () {
            res.redirect('/category-list')
        })
        .catch(function (err) {
            console.log(err);
        })
}

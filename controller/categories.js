const CategoryModel = require('../models/categoriesSchema')

exports.getList = function (req, res) {
   
    CategoryModel.find({})
        .then(function (data) {
            let categories = {
                categories: data
            }
            res.render('category.ejs',categories)
        })
        .catch(function (err) {
            console.log(err);
        })
}
exports.getCreateForm = function (req, res) {
    res.render('categoryCreate.ejs')
}

exports.create = function(req,res){
    var category = new CategoryModel(req.body);
    category.save(function(err){
        if(err){
            return res.status(500).send(err);
        }else{
            return res.redirect('/caretory-list')
        }
    })
}

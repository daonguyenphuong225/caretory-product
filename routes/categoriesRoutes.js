const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categories');
const CategoryModel = require('../models/categoriesSchema');


router.get('/category-list',CategoryController.getList)
router.post('/categories',CategoryController.create)
router.post('/delete/category/:id',CategoryController.deleteCategory)
router.post('/category-list/update',CategoryController.update)


module.exports = router
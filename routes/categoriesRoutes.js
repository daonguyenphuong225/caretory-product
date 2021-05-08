const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categories')


router.get('/caretory-list',CategoryController.getList)
router.get('/caretory-create',CategoryController.getCreateForm)
router.post('/categories',CategoryController.create)

module.exports = router
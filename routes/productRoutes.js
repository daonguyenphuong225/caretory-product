const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product');

router.get('/product-list',ProductController.getList)
router.get('/product-create',ProductController.getCreateForm)
router.post('/products',ProductController.create)
router.post('/delete/product/:id',ProductController.deleteProduct)

// router.get('/category-list/search',CategoryController.seacrchCategory)

router.get('/product-list/update/:id',ProductController.updateForm)
router.post('/product-list/update',ProductController.update)


module.exports = router
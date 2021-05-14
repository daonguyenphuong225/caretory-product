const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product');

router.get('/product-list',ProductController.getList)
router.post('/products',ProductController.create)
router.post('/delete/product/:id',ProductController.deleteProduct)

router.post('/product-list/update',ProductController.update)


module.exports = router
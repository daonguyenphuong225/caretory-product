const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product');
const ProductModel = require('../models/productSchema');

router.get('/product-list',ProductController.getList)
router.get('/product-create',ProductController.getCreateForm)
router.post('/product',ProductController.create)


module.exports = router
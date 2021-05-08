const router = require("express").Router();

const CategoryRouter = require('./categoriesRoutes')
const ProductRouter = require('./productRoutes');
router.use('/',CategoryRouter);
router.use('/',ProductRouter);


module.exports = router;
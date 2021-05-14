const ProductModel = require("../models/productSchema");
const CategoryModel = require("../models/categoriesSchema");
const numeral = require("numeral");
const dayjs = require("dayjs");
const { fullTextSearch } = require("../until/until");

exports.getList = function (req, res) {
  let { name, status, categories, price, sort } = req.query;

  //Điều kiẹn sắp xếp
  if (sort == 0) {
    sort = { name: 1 };
  }
  if (sort == 1) {
    sort = { created_at: 1 };
  }
  if (sort == 2) {
    sort = { created_at: -1 };
  }

  //Bộ lọc
  let match = {};
//Lọc theo tên
  if (name) {
    match.name = fullTextSearch(name);
  }
//Lọc theo trạng thái
  if (status) {
    match.status = status;
  }

  //Lọc theo giá
  if (price) {
    if (price == 0) {
      match.price = { $lt: 500000 };
    }
    if (price == 1) {
        match.price=[]
        for(i=500;i<= 2000;i++){
            match.price.push(i*1000)
        }
    }
    if (price == 2) {
      match.price = { $gt: 2000000 };
    }
  }

  //Lọc theo danh mục
  if(categories){
      match._id = [categories]
  }

  ProductModel.find(match)
    .sort(sort)
    .then(function (data1) {
      CategoryModel.find({}).then((data2) => {
        let rs = {
          products: data1,
          match: req.query,
          dayjs: dayjs,
          numeral: numeral,
          categories: data2,
        };
        res.render("product.ejs", rs);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

exports.create = function (req, res) {
  ProductModel.create(req.body)
    .then((data) => {
      CategoryModel.updateOne(
        { _id: req.body.categories },
        { $addToSet: { productIds: data.id } }
      )
        .then(() => {
          res.redirect("/product-list");
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteProduct = function (req, res) {
  CategoryModel.updateOne(
    { productIds: req.params.id },
    { $pull: { productIds: req.params.id } }
  )
    .then(() => {
      ProductModel.deleteOne({ _id: req.params.id })
        .then(function () {
          return res.redirect("/product-list");
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};

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
    }
  )
    .then(function () {
      CategoryModel.updateOne(
        { productIds: req.body.id },
        { $pull: { productIds: req.body.id } }
      )
        .then(() => {
          CategoryModel.updateOne(
            { _id: req.body.categories },
            { $addToSet: { productIds: req.body.id } }
          )
            .then(() => {
              res.redirect("/product-list");
            })
            .catch((err) => {
              res.json(err);
            });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch(function (err) {
      res.json(err);
    });
};

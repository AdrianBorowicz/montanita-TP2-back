const mongoose = require('mongoose');
const Product = require('../models/products');
const Methods = require('./CommonMethods.js');


function postProduct(req, res) {
    let product = new Product();
    product.name = req.body.name;
    product.description = req.body.description;
    product.image = req.body.image;
    product.price = req.body.price;
    product.category_id = req.body.category_id;
    Methods.saveDocument(res, product);
}

function postProductsList(req, res) {
    let productList = new Array();
    let i = 0;
    req.body.forEach(product => {
        productList[i] = new Product();
        productList[i].name = product.name;
        productList[i].description = product.description;
        productList[i].image = product.image;
        productList[i].price = product.price;
        productList[i].category_id = product.category_id;
        i++;
    });
    Product.insertMany(productList)
        .then(res.send('Se han creado los nuevos productos con exito.'))
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: 'No se han guardado los productos.' })
        })
}

function getProducts(req, res) {
    Product
        .find()
        .populate({path: 'category_id', select: 'name'})
        .then(data => {
            return res.send(data);
        })
        .catch(err=>{
            console.log(err);
            return res.status(404).send(err);
        })
}

function getProductById(req, res) {
    let productId = req.params;
    Product.findById(productId, (err, product)=>{Methods.callBackByiD(res, err,product)})
}

function deleteProductById(req, res) {
    let productId = req.params;
    Product.findByIdAndDelete(productId, (err, product)=>{Methods.callBackByiD(res, err, product)})
}


module.exports = {
    postProduct,
    getProducts,
    getProductById,
    deleteProductById,
    postProductsList
}
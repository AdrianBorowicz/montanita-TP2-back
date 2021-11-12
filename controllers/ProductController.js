const mongoose = require('mongoose');
const Product = require('../models/products');

function postProduct (req,res){
    let product = new Product();
    product.name=req.body.name;
    product.description=req.body.description;
    product.image = req.body.image;
    product.price = req.body.price;
    product.category =req.body.category;

    product.save((err, productStored)=>{
        if (err){res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
    }
        res.status(200).send({product: productStored});
    })
}

function postProductsList(req, res){
    let productList= new Array();
    let i=0;
    req.body.forEach(product => {
        productList[i]= new Product();
        productList[i].name= product.name;
        productList[i].description= product.description;
        productList[i].image = product.image;
        productList[i].price = product.price;
        productList[i].category = product.category;
        i++;
    });
    Product.insertMany(productList)
    .then(res.send('Se han creado los nuevos productos con exito.'))
    .catch(err=> console.log(err))
}

function getProducts(req,res){
    Product
    .find()
    .then(data=>{
        res.send(data);
    })
}

function getProductById(req,res){
    let productId = req.params;
    Product.findById(productId, (err, product)=>{
        if(err){
            res.status(500).send({message: err});
        } else if (!product){
            res.status(404).send({message: 'Producto no encontrado.'});
        } else{
            res.send(product);
        }
    })
}

function deleteProductById(req, res){
    let productId = req.params;
    Product.findByIdAndDelete(productId, (err, product)=>{
        if(err){
            res.status(500).send({message: err});
        } else if (!product){
            res.status(404).send({message: 'Producto no encontrado.'});
        } else{
            res.send(product);
        }
    })
}

module.exports={
    postProduct,
    getProducts,
    getProductById,
    deleteProductById,
    postProductsList
}
const mongoose = require('mongoose');
const Category = require('../models/categories');
const Methods = require('./CommonMethods.js');


function postCategory(req, res) {
    let category = new Category();
    product.name = req.body.name;
    Methods.saveDocument(res, category);
}

function postCategoriesList(req, res) {
    let categoryList = new Array();
    let i = 0;
    req.body.forEach(category => {
        categoryList[i] = new Category();
        categoryList[i].name = category.name;
        i++;
    });
    Category.insertMany(categoryList)
        .then(res.send('Se han creado las nuevas categorias con exito.'))
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: 'No se han guardado las nuevas categorias.' })
        })
}

function getCategories(req, res) {
    Category
        .find()
        .then(data => {
            res.send(data);
        }, err =>{
            res.status(404).send({message: 'No se han encontrado categorias!'})
        })
}

function getCategoryById(req, res) {
    let categoryId = req.params;
    Category.findById(categoryId, (err, category)=>{Methods.callBackByiD(res, err,category)})
}

function deleteCategoryById(req, res) {
    let categoryId = req.params;
    Category.findByIdAndDelete(categoryId, (err, category)=>{Methods.callBackByiD(res, err, category)})
}


module.exports = {
    postCategory,
    getCategories,
    getCategoryById,
    deleteCategoryById,
    postCategoriesList
}
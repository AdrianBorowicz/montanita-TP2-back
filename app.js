const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const auth = require('./middlewares/auth.js')

app.use(cors()).use(bodyParser.json());

const DSN = 'mongodb://localhost:27017/montanita';

const productCtrl = require('./controllers/ProductController.js');
const userCtrl = require('./controllers/UserController');

app.use(async (req, res, next)=>{
    try{
        await mongoose.connect(DSN, {
            serverSelectionTimeoutMS:3000,
        });
        next();
        mongoose.connection.on('error', err=>{
        })
    } catch(err){
        console.log(err);
        res.status(500).end();
    }
})


//request de user
app.post('/user/', userCtrl.login);

/* app.get('/private/', auth, function(req, res){
    res.status(200).send({message: 'Acceso permitido'})
})
 */

// request de productos
app.get('/products/', productCtrl.getProducts);

app.post('/product/', productCtrl.postProduct);

app.post('/products', productCtrl.postProductsList);

app.get('/product/:_id', productCtrl.getProductById);

app.delete('/product/:_id', productCtrl.deleteProductById);



//request de categorias

/* app.get('/categories/:id',(req,res)=>{
    require('./models/categories')
        .findById(req.params.id)
        .then(data=>{
            res.send(data);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).end()});
}) */



app.listen(3000, () => {
    //console.log("El servidor está inicializado en el puerto 3000");
   });
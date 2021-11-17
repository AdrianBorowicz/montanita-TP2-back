const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const auth = require('./middlewares/auth.js')

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const DSN = 'mongodb://localhost:27017/montanita';

const productCtrl = require('./controllers/ProductController.js');
const userCtrl = require('./controllers/UserController.js');
const categoryCtrl = require('./controllers/CategoryController.js');

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


//users

app.post('/signin/', userCtrl.signIn);

app.post('/signup/', auth, userCtrl.signUp);

app.get('/private/', auth, (req, res)=>{
    res.status(200).send({message: 'Acceso permitido'})
})


// products

app.get('/products/', productCtrl.getProducts);

app.post('/product/', auth,productCtrl.postProduct);

app.post('/products/', auth, productCtrl.postProductsList);

app.get('/product/:_id', productCtrl.getProductById);

app.delete('/product/:_id', auth, productCtrl.deleteProductById);


//categories

app.get('/categories/', categoryCtrl.getCategories);

app.post('/category/', auth, categoryCtrl.postCategory);

app.post('/categories/', auth, categoryCtrl.postCategoriesList);

app.get('/category/:_id', categoryCtrl.getCategoryById);

//solo se tiene que poder borrar si no esta asociada a ningun producto
app.delete('/category/:_id', auth, categoryCtrl.deleteCategoryById);



app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });
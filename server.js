const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes

app.get('/', (req, res) =>{
    res.send('Hello')
})

app.get('/blog', (req, res) =>{
    res.send('Blog')
})

//Show all Product
app.get('/products', async(req, res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Get Product By ID
app.get('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //cannot find any product in database
        if(!product){
            return res.status(404).json({message: 'cannnot find any product with ID ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //cannot find any product in database
        if(!product){
            return res.status(404).json({message: 'cannnot find any product with ID ${id}'})
        }
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Create Product
app.post('/products', async(req, res) =>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://zinmyoswe:12345Zinmyoswe@zinmyosweapi.s8bbjws.mongodb.net/?retryWrites=true&w=majority&appName=zinmyosweAPI')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API is running on port 3000');
    })
    
}).catch((error) => {
    console.log(error)
})
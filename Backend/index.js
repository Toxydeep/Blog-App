const express = require('express');
const path = require('path');    
const ejs = require('ejs')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog=require("./models/blog")

mongoose.connect('mongodb://127.0.0.1:27017/blogdata')
.then((e)=> console.log("MongoDB Connected"))


const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { cheakforauthenticationcookies } = require('./middlewares/authentication');
const app = express();
const PORT = 2000;

app.set("view engine","ejs")
app.set("views", path.resolve( "views"));

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cheakforauthenticationcookies("token"));
app.use(express.static(path.resolve('./public')))
app.get('/', async (req,res)=>{
    const allBlog= await Blog.find({})
    return res.render('home',{
        user:req.user,
        blogs:allBlog,

    });   
})
app.use('/user',userRoute);
app.use('/blog',blogRoute);
// If any request start with /user then use `userRoute`

app.listen(PORT , ()=>console.log(`Server started at PORT:${PORT}`));
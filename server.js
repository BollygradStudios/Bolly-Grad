const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const upload = require('./utils/multer');
require('./utils/cloudinary');
const methodOverride = require('method-override');


// Database
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    console.log()
})

// Set
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

// Landing Page
app.get('/',(req,res)=>{
    res.render('index');
})

// Course Page
app.get('/courses',(req,res)=>{
    res.render('webpages/courses');
})

// Production Page
app.get('/production',(req,res)=>{
    res.render('webpages/production');
})

// Faculty Page
app.get('/faculties',(req,res)=>{
    res.render('webpages/faculties');
})

// Contact Page
app.get('/contact',(req,res)=>{
    res.render('webpages/contact');
})

// Get all blogs
app.get('/blogs',async(req,res)=>{
    const blog = await Blog.find({});
    res.render('blogs/blogs',{blog});
})

// create blog form 
app.get('/create',(req,res)=>{
    res.render('blogs/new');
})

// Save Blog
app.post('/create',upload.single('img') ,async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.file.path);
    const theBlog = new Blog();
    theBlog.title = req.body.title;
    theBlog.img = result.secure_url;
    theBlog.category = req.body.category;
    theBlog.desc = req.body.desc;

    await Blog.create(theBlog);
    res.redirect('/blogs')
})

// view single blog
app.get('/blogs/:id',async(req,res)=>{
    const {id} = req.params;
    // console.log(id)
    const data = await Blog.findById(id);
    const date = `${data.createdAt.getDate()}-${data.createdAt.getMonth()+1}-${data.createdAt.getFullYear()}`;
    res.render('blogs/view',{data,date});
})

app.listen(process.env.PORT || 5000,()=>console.log('Server is running at port 5000'));

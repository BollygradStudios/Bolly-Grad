const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

const Blog = new mongoose.model('Blog',blogSchema);

module.exports = Blog;
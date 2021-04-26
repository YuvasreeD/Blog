const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-yuvasree:65HariYuvi74@cluster0.zabaa.mongodb.net/blogdb",{useNewUrlParser:true});

//const blog=[];
//schema
const blogSchema = new mongoose.Schema({
    title: String,
    post: String
});

//model
const Blog = mongoose.model("Blog",blogSchema);


app.get("/",function(req,res){
    Blog.find(function(err,contents){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("home",{blogPost:contents});
        }
    })
    
});

app.get("/compose",function(req,res){
    res.render("compose");
})
app.get("/about",function(req,res){
    res.render("about");

});
app.get("/contact",function(req,res){
    res.render("contact");

});

app.get("/:postTopic",function(req,res){
    const postname = _.lowerCase(req.params.postTopic);

    Blog.find(function(err,contents){
        if(err)
        {
            console.log(err);
        }
        else
        {
            contents.forEach(function(i){
                const titlename = _.lowerCase(i.title)
                if(titlename === postname)
                {
                    
                    res.render("post",{postTitle: i.title, postContent: i.post });
                    
                }
            });
            
        }
    })
    
    

});

app.post("/compose",function(req,res){
    const blogItems = new Blog({
    title: req.body.title,
    post: req.body.post
    });
    blogItems.save();
    
    res.redirect("/");
});

//schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

//model
const Contact = mongoose.model("Contact",contactSchema);

app.post("/contact",function(req,res){
    const contactItems = new Contact({
        name: req.body.userName,
        email: req.body.userEmail,
        message: req.body.userMsg
    });
    contactItems.save();
    
    res.render("thanks");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("Successfully connected to port 3000");

});
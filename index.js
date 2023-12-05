const express = require("express");
const app = express();
const port=8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');// package for creating new 
var methodOverride = require('method-override');

app.use(methodOverride('_method'));// override with POST having ?_method=patch   

app.use(express.urlencoded({extended:true})); //for data parsing

app.listen(port,()=>{ //listing for port 
    console.log(`Listening for port${port} Quora`);

});


app.set("view engine","ejs"); // for using ejs
app.set("views",path.join(__dirname,"views")); // for templating 
app.use(express.static(path.join(__dirname,"public"))); //for using other files in index.js


let posts=[
    {
        id:uuidv4(),
        username : "divyasaini007",
        contant : "Hello i am web developer",
    },
    {
        id:uuidv4(),
        username : "dishantsaini007",
        contant : "Hello i am web developer",

    },
    {
        id:uuidv4(),
        username : "Harry62622",
        contant :"Hello i am Graphics designer",
    }
]

app.get("/posts",(req,res)=>{ //index page
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{ //new post form page
    res.render("new.ejs");
    
});

app.post("/posts",(req,res)=>{ // adding new post
    let {username,contant}=req.body;
    let id = uuidv4();
    posts.push({id,username,contant});
    console.log(posts);
    // res.send("post request working");
    res.redirect("/posts");


});

app.get("/posts/:id",(req,res)=>{ //Show indivisual post
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id );
    // console.log(post.id);
    res.render("show.ejs",{post});

    
});

app.patch("/posts/:id",(req,res)=>{

    let {id} =req.params;
    let newcontant = req.body.contant;
    let post = posts.find((p) => id === p.id );
    post.contant=newcontant;
    console.log(post);
    res.redirect("/posts");
    
});

app.delete("/posts/:id",(req,res)=>{

    let {id} =req.params;
    posts = posts.filter((p) => id !== p.id );
    console.log(posts);
    res.redirect("/posts");
    
});

// app.post("/posts/:id",(req,res)=>{

//     let {id} =req.params;
//     let newcontant = req.body.contant;
//     let post = posts.find((p) => id === p.id );
//     post.contant=newcontant;
//     console.log(post);
//     res.redirect("/posts");
    
// });

app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p) => id === p.id );
    res.render("edit.ejs",{post});


});


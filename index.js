const express = require('express');
const mongoose =require('mongoose');
const route = require('./Routes/url_route');
require('dotenv').config();
const app = express();


//mongoose.connect('mongodb://localhost:27017/test_auth');
mongoose.connect('mongodb+srv://Hari:Hari@cluster0.ildam.mongodb.net/simple_auth?retryWrites=true&w=majority');
const con= mongoose.connection;
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}

app.use(express.json());

app.use(route);


app.get('/',(req,res)=>{
    res.status(200).send("<h1> Welcome to Short_url_generator");
});


app.listen(process.env.PORT || 4000 ,(err)=>{
if (err){
    console.log(`Error in listening the ${process.env.PORT}`)
}else{
    console.log(` listening in ${process.env.PORT}`)  
}
})
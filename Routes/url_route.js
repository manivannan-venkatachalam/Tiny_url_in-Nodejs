var express = require('express');
var url =require('../models/url_schema');
var shortid =require('shortid');
var valid_url=require('valid-url');


var router = express.Router();


var baseURL='http:localhost:3000';

router.post('/sorturl',async(req,res)=>{
    const longUrl = req.body.longurl;
    console.log(longUrl);
    if(!valid_url.isUri(baseURL)){
        res.status(401).send("invalid base URL")
    }

    
    const urlcode =shortid.generate();
    if (valid_url.isUri(longUrl)){
        let URL = await url.findOne({
            longurl:longUrl
        });

        if(URL){
            res.json(URL);

    }
    else{
        const shorturl =baseURL+'/'+urlcode;
        let new_url =  new url({
            longurl :longUrl,
  shorturl:shorturl,
  shortid :urlcode,
  date: new Date()

});

await new_url.save();
console.log(new_url);
res.status(201).json(new_url);
    }
}
});
router.get('/:code',async(req,res)=>{
try{
    let Url = await url.findOne({shortid:req.params.code});

    if (Url){
        res.redirect(Url.longurl);
    }else{
        res.status(404).json("Invalid URL")

    }
}
catch(err){
res.status(500).json("server error")
}
});

module.exports =router;
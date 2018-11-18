const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
var con;
mongoose.connect("mongodb://localhost/hack2hire", function (err) {
    if (err) throw err;
    console.log('connected to db');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
con = mongoose.connection;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
);

var ProductSchema = new Schema({
    productId: {type:number},
    productName: {type:String},
    productCategory: {type:String},
    productSpecification : {type:String},
    productPrice : {type:number},
    productImageURL : {type:String},
    productSearchTextURL : {type:String}

})

var ProductModel = mongoose.model("product",ProductSchema);

app.get("http://localhost:6666/getProducts",(req,res)=>{
    ProductModel.findOne({productId:"123"})
    .exec((err,result)=>{
        if(err){
            res.status(404).send(err);
            res.end();
        }
        else{
            res.send(result);
            res.end();
        }
    })
})
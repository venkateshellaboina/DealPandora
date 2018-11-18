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
    productId: {type:String},
    productName: {type:String},
    productCategory: {type:String},
    productSpecification : {type:String},
    productPrice : {type:String},
    productImageURL : {type:String},
    productSearchTextURL : {type:String}

})

var userSchema = new Schema({
    userName : {type: String},
    mobileNo : {type : String}
})

var CardSchema = new Schema({
    userName : {type : String},
    cardTag  :{type:String},
    cardNo: {type:String},
    nameOnCard : {type:String},
    month :{type: String},
    year : {type: String},
    bankId : {type: String}
})

var BankSchema = new Schema ({
    bankId : {type: String},
    bankName : {type : String}
})

var OfferSchema = new Schema ({
    productId: {type: String},
    bankId : {type : String},
    productDiscountPrice : {type: String}
})



var ProductModel = mongoose.model("product",ProductSchema);
var BankModel = mongoose.model("bank",BankSchema);
var OfferModel = mongoose.model("offer",OfferSchema);
var CardModel = mongoose.model("card",CardSchema);

app.get("/getProducts",(req,res)=>{
    ProductModel.find()
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

app.post("/addProducts",(req,res)=>{
   
    
    var item = new ProductModel({
        productId: req.body.productId,
        productName: req.body.productName,
        productCategory:req.body.productCategory,
        productSpecification : req.body.productSpecification,
        productPrice : req.body.productPrice
    })
    item.save((err,result)=>{
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

app.post("/getOffers",(req,res)=>{
    let id= req.body.productId;
    OfferModel.find({'productId': id})
    .exec((err,result)=>{
        if(err){
            res.send(err);
            res.end();
        }
        else{
            res.send(result);
            res.end();
        }

    })
})

app.post("/addCard",(req,res)=>{
    CardModel.create({
        userName : req.body.name,
        cardNo: req.body.cardNo,
        nameOnCard : req.body.nameOnCard,
        month : req.body.cardNo,
        year : req.body.year,
        bankId : req.body.bankId
    })

})



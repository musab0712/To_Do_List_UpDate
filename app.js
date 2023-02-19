const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ToDoListDB");
} 

const itemSchema = new mongoose.Schema({
    name : String
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name : "Musab"
});

const item2 = new Item({
    name : "Hassan"
});

const item3 = new Item({
    name : "Arman"
});

const defaultItems = [item1, item2, item3];



app.get("/", function(req, res){
    let day = date.getDate();
    Item.find({}, function(err, getItems){
        if(getItems.length === 0){
            Item.insertMany(defaultItems, function (err, doc) {
                if(err)
                    console.log(err);
                else
                    console.log("Successfully inserted defaultItems into db");
            });
            res.redirect("/");
        }
        else
            res.render("list", {ListTitle : day, newListItems : getItems});
    })
});

// app.post("/", function(req, res) {
//     let item = req.body.newItem;
//     if(req.body.button === "Work"){
//         works.push(item);
//         res.redirect("/work");
//     }else{
//         items.push(item);
//         res.redirect("/");
//     }
   
// } );


app.listen(3000, function(){
    console.log("server started");
});
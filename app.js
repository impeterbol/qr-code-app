const express = require ('express');
const mongoose = require("mongoose");
const ejs = require('ejs');
const PORT = process.env.PORT || 3000;
// const db = require("./models")

let app = express();
app.set('view engine', 'ejs');
const router = express.Router();

let url = "mongodb://localhost:27017/peterdb";
let bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");

    app.listen(PORT,()=> console.log("server is running on " + PORT));
  });


  

//schema

var nameSchema = new mongoose.Schema({
    number: String,
    date: String,
    object: String,
    id: String,
    weight: String,
    dimension: String,
    cut: String,
    shape: String,
    color: String,
    comment: String,
    comment2: String,
    origin: String

  });

  //model
  var User = mongoose.model("User", nameSchema);

// define a middleware that can be used by the server to read JSON payload.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });




app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    var thisIsId = myData._id;
    var thisIsUrl = `http://localhost:3000/${thisIsId}`;
    myData.save()

      .then(item => {
          console.log(item._id);
          console.log({item:item});
        res.render("success", {item});
      })
      
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });
  

  app.get("/fetch", function(req, res) {
    User.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });



 app.get("/:id",function(req, res) {
    var thisIsId = req.params.id;
   

    User.find({
        _id: thisIsId
    }, function(err, data) {
     
      if (err) {
        res.send(err);
      } else {

     

          console.log("HERE!")
        res.render("products", {results:data});
      }
    });
  });






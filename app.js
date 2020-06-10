const express = require ('express');
const mongoose = require("mongoose");
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


  app.get("/123", (req, res) => {
    res.render("products")
  });




app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    
    myData.save()
      .then(item => {
        res.send(myData._id + " thanks!");
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

 app.get("/:_id",function(req, res) {
    User.find({
        _id: req.params._id
    }, function(err, data) {
       console.log(data)
      if (err) {
        res.send(err);
      } else {
        res.render("products", {results:data});
      }
    });
  });






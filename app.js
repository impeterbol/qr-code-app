let express = require ('express');
let port = 3000;
let app = express();
const router = express.Router();
let mongoose = require("mongoose")
let url = "mongodb://localhost:27017/peterdb";
let bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

  app.use("/", router);

  app.listen(port,()=> console.log("server is running on " + port));

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
    
    myData.save()
      .then(item => {
        res.send(myData._id + " thanks!");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

  router.route("/fetch").get(function(req, res) {
    User.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.route("/:_id").get(function(req, res) {
    User.find({
        _id: req.params._id
    }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });






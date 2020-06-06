let express = require ('express');
let app = express();
let MongoClient = require('mongodb').MongoClient;

// URL of local or remote MongoDB instance
var url = "mongodb://localhost:27017/";

app.listen(3000,()=> console.log("server is running on port 3000"));
// define a middleware that can be used by the server to read JSON payload.
app.use(express.json());

//tests
// app.get("/:number", (req, res) => {
//     res.send(req.params.number);
//     console.log(req.params.number);
// });


//post

app.post('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").insertOne({
            name: req.body.name,
            age: req.body.age
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

// get

app.get('/:name', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").findOne({
            name: req.params.name
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});








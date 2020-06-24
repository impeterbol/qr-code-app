const User = require("../models/User")
//once added by admin - form will post product info via this path - new product route
module.exports =(req, res) => {
    console.log("HERE REQ BODY" + req.body);
    
    
        var myData = new User(req.body);
      
        myData.save()
    
          .then(item => {
              console.log(item._id);
              console.log({item:item});
            res.render("success", {item});
          })
          
          .catch(err => {
            res.status(400).send("unable to save to database");
          });
      };
//end of module
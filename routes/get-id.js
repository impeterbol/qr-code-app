const QRCode = require('qrcode');
const User = require("../models/User")
//user path to render product info from db based on the unique id generated by mongo
module.exports = (req, res)=> {
    var thisIsId = req.params.id;
 

    User.find({
        _id: thisIsId
    }, function(err, data) {
     
      if (err) {
        res.send(err);
      } else {
  
        QRCode.toDataURL(`http://localhost:3000/${thisIsId}`, function (err, url) {
            
            res.render("products",{results:data, qr:url});
            });
         
      }
    });
  }
//end of module
const User = require("../models/User")
//fetching everything to see if it was posted if unsure
module.exports = (req, res)=> {
    User.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
//end of module






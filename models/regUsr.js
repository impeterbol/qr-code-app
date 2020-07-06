const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const regUsrSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    email_is_verified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String
    }
});

const regUsr = mongoose.model("regUsr", regUsrSchema);

module.exports = regUsr;

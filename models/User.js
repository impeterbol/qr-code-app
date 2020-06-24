const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    origin:String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    username : String
});
const adminSchema = new Schema({
    email : {type : String , unique : true},
    password : String,
    username : String
});
const coursesSchema = new Schema({
    creatorId : ObjectId,
    title : String,
    desciption : String,
    price : Number

});
const purchaseSchema = new Schema({
    userId  : ObjectId , 
    courseId : ObjectId
});
//use references to define what Schema are you exprecting the objectId to belong to

const Usermodel = mongoose.model('user' , userSchema);
const Coursemodel = mongoose.model('courses' , coursesSchema);
const Adminmodel = mongoose.model('admin' , adminSchema);
const Purchasemodel = mongoose.model('purchase' , purchaseSchema);

module.exports = {
    Usermodel : Usermodel,
    Coursemodel : Coursemodel,
    Adminmodel : Adminmodel,
    Purchasemodel : Purchasemodel
};

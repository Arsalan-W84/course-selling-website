const {Router} = require("express");
const userRouter = Router();

const {Usermodel} = require("../db");
const {Purchasemodel} = require("../db");

const {user_auth} = require("../auth/usermiddleware");

userRouter.post("/signup" , async function(req,res){});
userRouter.post("/login" , async function(req,res){});
userRouter.post("purchases" ,user_auth, async function(req,res){});
userRouter.get("/all courses" , user_auth , async function(req,res){});
userRouter.get("/course-content" , user_auth  , async function(req,res){});


module.exports ={
    userRouter : userRouter
}
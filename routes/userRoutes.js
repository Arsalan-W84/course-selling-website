const {Router} = require("express");
const userRouter = Router();
//import {z} from require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {USER_SECRET} = require("../config");
const {Usermodel , Purchasemodel} = require("../db");


const {user_auth} = require("../auth/usermiddleware");

userRouter.post("/signup" , async function(req,res){
    const {email , password , username} = req.body;

    //zod validation
    /*const data = z.object({
        email : z.string().min(5).max(25).email(),
        password : z.string.min(6).max(20),
        username : z.string()
    });
    const parsedData = data.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            Error : parsedData.error
        })
    }*/

    //hash the plaintext password before storing in the DB , using bcrypt
    const hashedPassword = await bcrypt.hash(password,5);
    //insert the data 
    try{
        await Usermodel.create({
            email : email ,
            password : hashedPassword,
            username : username
        });
    }catch(e){
        return res.status(401).json({
            message : "Signup failed"
        })
    }
    return res.json({
        message : "You are successfully signed up."
    })
    

});

userRouter.post("/login" , async function(req,res){
    const {email , password} = req.body;
    try{
        //find the user through email
        const founduser  = await Usermodel.findOne({
            email : email 
        });
        if(founduser){
            //use bcrypt.compare to verify the hashed passwords
            const passwordMatch = await bcrypt.compare(password , founduser.password);
            if(passwordMatch){
                const token = jwt.sign({
                    id : founduser._id
                }, USER_SECRET);
                return res.json({
                    token : token
                });
            }else{
                return res.status(401).json({message : "Incorrect password"});
            }
        }else{
            return res.json({
                message : "This user dosen't exist!"
            })
        }
    }catch(err){
        return res.status(403).json({message : err});
    }
});

userRouter.post("/purchases" ,user_auth, async function(req,res){
    return res.json({
        message : "Purchase endpoint"
    });
});

userRouter.get("/all-courses" , user_auth , async function(req,res){
    return res.json({
        message : "All courses endpoint"
    });
});

userRouter.get("/course-content" , user_auth  , async function(req,res){
    return res.json({
        message : "Course Content endpoint"
    });
});

module.exports ={
    userRouter : userRouter
}
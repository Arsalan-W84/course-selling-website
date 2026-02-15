const {Router} = require("express");
const AdminRouter  = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ADMIN_SECRET = require("../config");
const {Adminmodel} = require("../db");
const {Coursemodel} = require("../db");

const {admin_auth } = require("../auth/adminmiddleware");

AdminRouter.post("/signup" , async function(req,res) {
    const {email , password , username} = req.body;
    
        //hash the plaintext password before storing in the DB , using bcrypt
        const hashedPassword = await bcrypt.hash(password,5);
        //insert the data 
        try{
            await Adminmodel.create({
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
AdminRouter.post("/login" , async function(req,res) {
    const {email , password} = req.body;
        try{
            //find the user through email
            const founduser  = await Adminmodel.findOne({
                email : email 
            });
            if(founduser){
                //use bcrypt.compare to verify the hashed passwords
                const passwordMatch = await bcrypt.compare(password , founduser.password);
                if(passwordMatch){
                    const token = jwt.sign({
                        id : founduser._id
                    },ADMIN_SECRET);
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

AdminRouter.post("/create-course" , admin_auth , async function(req,res) {
    return res.json({
        message : "Create-course endpoint"
    })
});

AdminRouter.delete("/delete-course" , admin_auth , async function(req,res) {
    return res.json({
        message : "Delete-course endpoint"
    })
});

module.exports = {
    AdminRouter : AdminRouter
};

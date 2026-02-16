const {Router} = require("express");
const AdminRouter  = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ADMIN_SECRET = process.env.ADMIN_SECRET;
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
                    console.log(ADMIN_SECRET);
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
            return res.status(403).json({message : "Error!!"});
        }
});

AdminRouter.post("/course/create" , admin_auth , async function(req,res) {
    const AdminId = req.userId;
    const {title,description,price } = req.body;
    //create a new course 
    try{
        const course = await Coursemodel.create({
        creatorId : AdminId,
        title : title,
        description : description,
        price : price
        }); 
        return res.json({
        message : "Course Created",
        Creator  : AdminId,
        title : course.title,
        courseId : course._id
        });
    }catch(err){
        return res.status(500).json({
            message : "Error creating the course "
        });
    }
});

AdminRouter.put("/course/update" , admin_auth , async function(req,res) {
    const AdminId = req.userId; //objectID
    const {title,description,price,courseId } = req.body;
    //zod validation of entered inputs required
    //update the course ONLY IF THE ADMIN IS THE CREATOR OF THAT COURSE 
    const course = await Coursemodel.findOne({
        _id : courseId,
        creatorId : AdminId
    });
    if(!course){
        return res.status(403).json({
            message : "Unauthorized or course not found!"
        });
    }
    try{
        await Coursemodel.updateOne({
            _id : courseId
        },{
        title : title,
        description : description,
        price : price
        }); 
        return res.status(200).json({
        message : "Course Updated",
        })

    }catch(err){
        return res.status(500).json({
            message : "Error updating the course "
        })
    }
});

AdminRouter.get("/course/all" , admin_auth , async function(req,res) {
    const AdminId = req.userId;
    try{
        const courses = await Coursemodel.find({
            creatorId :  AdminId
        });
        return res.status(200).json({
            courses : courses
        });
    }catch(e){
      return res.status(500).json({
            message : "Error getting the course "
        }); 
    }

});

AdminRouter.delete("/course/delete" , admin_auth , async function(req,res) {
    const AdminId = req.userId;
    const {title,desciption,price,courseId } = req.body;
    //update the course ONLY IF THE ADMIN IS THE CREATOR OF THAT COURSE 
    const course = await Coursemodel.findOne({
        _id : courseId ,
        creatorId : AdminId
    });
    if(!course){
        return res.status(403).json({
            message : "Unauthorized or course does not exist!"
        });
    }
    try{
        await Coursemodel.deleteOne({
            _id : courseId,
            creatorId : AdminId
        });
        return res.status(200).json({
            message : "Course Deleted Successfully!"
        });

    }catch(e){
        return res.status(500).json({
            message : "Error in deleting this course!"
        })
    }
});


module.exports = {
    AdminRouter : AdminRouter
};

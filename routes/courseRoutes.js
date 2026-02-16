const {Router} = require("express");
const courseRouter = Router();
const {user_auth} = require("../auth/usermiddleware");
const {Coursemodel, Purchasemodel} = require("../db");

courseRouter.post("/purchase" , user_auth , async function (req,res) {
    const userId = req.userId;
    const courseId=req.body.courseId;
    //for now just complete the purchase 
    try{
        const response = await Purchasemodel.create({
            userId : userId, 
            courseId : courseId 
        });
        if(!response){
            return res.status(401).json({
                message : "Course not found!"
            })
        }
        return res.status(200).json({
            message : "Course Purchased.Congrats!"
        });
    }catch(err){
        return res.status(500).json({
            message : "Error in purchasing the course"
        });
    }

});

courseRouter.get("/preview" ,async function (req,res) {
    //return all the courses in the database 
    const courses = await Coursemodel.find({});
    return res.json({
        courses : courses
    });
});

module.exports = {
    courseRouter : courseRouter
};
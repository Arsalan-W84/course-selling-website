const express = require("express");
const app = express();
const mongoose = require("mongoose");
//instead of writing each individual route, create handlers in routes folder
//import your routes
const { userRouter } = require("./routes/userRoutes");
const { CourseRouter } = require("./routes/courseRoutes");
const { AdminRouter } = require("./routes/AdminRoutes");

app.use(express.json());

app.use("/user" , userRouter);
app.use("/admin" , AdminRouter);
//app.use("/course" , CourseRouter);

//before starting the server, the BE should be connected to the DB first 
async function main(){
    await mongoose.connect("mongodb+srv://arsalanwahid0804_db_user:C5S9Z6oTDJ2r3y5H@cluster0.mckhh0n.mongodb.net/Course-selling-website");
    app.listen(3000);
    console.log("App is running on port : 3000");
}
main();

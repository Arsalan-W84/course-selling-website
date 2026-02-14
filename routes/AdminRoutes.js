const {Router} = require("express");
const AdminRouter  = Router();

const {Adminmodel} = require("../db");
const {Coursemodel} = require("../db");

const {admin_auth } = require("../auth/adminmiddleware");
AdminRouter.post("/signup" , async function(req,res) {});
AdminRouter.post("/login" , async function(req,res) {});
AdminRouter.post("/create-course" , admin_auth , async function(req,res) {});
AdminRouter.delete("/delete-course" , admin_auth , async function(req,res) {});

module.exports = {
    AdminRouter : AdminRouter
};

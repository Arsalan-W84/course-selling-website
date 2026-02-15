const jwt = require("jsonwebtoken");
const ADMIN_SECRET = "UGEOIC56YTUA74VBNNRUMJC";

function admin_auth(req,res,next)   
{
   const token = req.headers.token;
    if(token){//token found , now verify it 
        const founduser = jwt.verify(token , ADMIN_SECRET);
        if(founduser){
            req.userId = founduser.id;
            next();
        }else{
            return res.json(403).json({
                message : "User not signed in!"
            });
        }
    }else{//token wasn't found
        return res.status(403).json({
            message : "Unauthorized!"
        });
    }
}



module.exports = {
    user_auth : user_auth
};

module.exports = {
    admin_auth : admin_auth
};
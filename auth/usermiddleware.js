const jwt = require("jsonwebtoken");
const USER_SECRET = "CERYTUANUMJOIUG5674VBNC";
function user_auth(req,res,next)
{ 
    const token = req.headers.token;
    if(token){//token found , now verify it 
        const founduser = jwt.verify(token , USER_SECRET);
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
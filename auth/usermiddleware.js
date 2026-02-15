const jwt = require("jsonwebtoken");
const USER_SECRET = require("../config");

function user_auth(req,res,next)
{ 
    const token = req.headers.token;
    if(token){//token found , now verify it 
        try{
            const founduser = jwt.verify(token , USER_SECRET);
            req.userId = founduser.id;
            next();
        }catch(e){
            return res.status(401).json({
                message : "Token invalid or expired!"
            })
        }
        
    }else{//token wasn't found
        return res.status(403).json({
            message : "Empty token!"
        });
    }
}

module.exports = {
    user_auth : user_auth
};
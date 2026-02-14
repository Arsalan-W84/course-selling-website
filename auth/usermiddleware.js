function user_auth(req,res,next)
{
    //verify the token sent 
    next();
}

module.exports = {
    user_auth : user_auth
};
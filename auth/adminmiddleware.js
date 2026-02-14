function admin_auth(req,res,next)   
{
    next();
}

module.exports = {
    admin_auth : admin_auth
};
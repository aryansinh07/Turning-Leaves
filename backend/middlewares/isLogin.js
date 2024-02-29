const { appErr } = require("../utilis/appErr");
const getTokenFromHeader = require("../utilis/getTokenFromHeader");
const verifyToken = require("../utilis/verifyToken");

const isLogin = (req,res,next) => 
{
   const token = getTokenFromHeader(req) ; 
   const decodedUser = verifyToken(token); 
   req.user = decodedUser.id ; 
   console.log(req.user); 
   if(!decodedUser)
   {
      return next(appErr("User not valid, Please Login Again",404)); 
   }
   next(); 
}; 

module.exports = isLogin ; 

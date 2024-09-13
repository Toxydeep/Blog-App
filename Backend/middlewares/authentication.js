const {validateToken}=require("../services/authentication")

function cheakforauthenticationcookies (cookieName){
  return (req,res,next)=>{
   const cheakcookie=req.cookies[cookieName];
   
   if(!cheakcookie){
    return  next();
  }
  try {
    const userpayload= validateToken(cheakcookie);
    req.user=userpayload;
  } catch (error) {
    console.error(error); 
  }
   return next();
}
}
module.exports={
  cheakforauthenticationcookies,
}
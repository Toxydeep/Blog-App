const JWT=require("jsonwebtoken");
const secreat="$password@ram";
function createTokenForUser(user){
  const payload={
   _id:user._id,
   email:user.email,
   imageurl:user.imageurl,
   role:user.role,};
   const token=JWT.sign(payload,secreat);
   return token;
}
function validateToken(token){
  try {
    const payload=JWT.verify(token,secreat)
  return payload;
    
  } catch (error) {
    throw new Error("invailed token");
  }
}
module.exports={
  createTokenForUser,
  validateToken,
};
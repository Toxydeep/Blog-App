
const {Schema,model }=require("mongoose");
const { createHmac,randomBytes } = require('node:crypto');
const {createTokenForUser}=require("../services/authentication")
const userSchema = new Schema({
fullName:{
  type:String,
  required:true
},
email:{
  type:String,
  required:true,
  unique:true,
},
salt:{
  type:String,
},

password:{
  type:String,
  required:true,
  unique:true,
},
profileImageURL:{
  type:String,
  default:'/images/default.jpg',
},
role:{
  type:String,
  enum:["USER","ADMIN"],
  default:"USER",
},
},
{timestamp:true});
//pre middleware
userSchema.pre('save',function(){
const user=this;
if(!user.isModified("password") ) return;
const salt=randomBytes(16).toString('hex');
console.log(salt);
const hashPassword=createHmac('sha256',salt)
.update(user.password)
.digest("hex");
this.salt = salt;
this.password=hashPassword;

});
userSchema.static('matchPasswordAndGenrateToken',async function(email,password){
  const user =await this.findOne({email});
  if(!user) throw new Error('User not found !');

  
  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvideHash = createHmac("sha256",salt)
  .update(password)
  .digest("hex")

  if(hashedPassword !== userProvideHash){
      throw new Error("Incorrect Password!");
  }
  const token=createTokenForUser(user)
  return token; 
  if (err) return req.next(err);

})
const User=model("user",userSchema);
module.exports=User;
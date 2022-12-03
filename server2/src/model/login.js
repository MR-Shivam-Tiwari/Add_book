const mongoose=require("mongoose");
const Schema= mongoose.Schema ;
const jwt = require("jsonwebtoken");


const LoginSchema=new Schema({
   
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
   
        select: false,
      }
   

})


LoginSchema.methods.generateAuthToken=async function(){
    try{
      //  console.log(this._id)
const token=jwt.sign({_id:this._id},"authenticationpagenodejsassignmentgdfhghghjhg",{
  expiresIn: "7d",
});
//this.tokens=this.tokens.concat({token:token})
// await this.save();
return token;
//console.log(token)
    }catch(error){
console.log(error)
    }
}

const Loginuser=mongoose.model("Loginuser",LoginSchema)

module.exports=Loginuser

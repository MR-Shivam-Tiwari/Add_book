const jwt = require("jsonwebtoken");
const Loginuser=require("../model/login");


const auth=async(req,res,next)=>{
    const token=req.headers.authorization || req.headers["authentication"]
    const email=req.headers["auth"]
    if(!token){
        return res.json({message:"User not Loged In"})
    }
    try{
  
        const verifyUser=jwt.verify(token,"authenticationpagenodejsassignmentgdfhghghjhg");
console.log(verifyUser)


const data= await Loginuser.findOne({_id:verifyUser._id})
 console.log(this._id)
// if(user){

    req.user=email
    console.log(req.user)
    next()
    // }else{
    //   res.json({message:"failed"})
    // }
    }catch(error){
res.status(401).send(error)
    }
}

module.exports=auth
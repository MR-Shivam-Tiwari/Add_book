const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const validator=require("validator")
const jwt = require("jsonwebtoken");

const userSchema=new Schema({
    
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
      }, 
      cpassword: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
      }, 

})


const User=mongoose.model("User",userSchema);


module.exports=User
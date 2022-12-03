const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const connection=require("./connection")
const Loginuser=require("./model/login")
const port=process.env.PORT || 8000
const User=require("./model/register")
const app=express()
const jwt=require("jsonwebtoken")
const jwtkey="jwt"
const auth=require("./authentic/Auth")
const Userpost=require("./model/post")
const cors=require("cors")
const validator=require("validator")

app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(express.json())



app.post("/register",async(req,res)=>{
    const { email, password,cpassword } = req.body;
var new_user=  new User({
   
    email:req.body.email,
    password:req.body.password,
    cpassword:req.body.cpassword
})
let existinguser;
try{
existinguser= await User.findOne({email:email})
}catch(error){
console.log(error)
}
if (existinguser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
if(! validator.isEmail(email)){
    return res
    .status(400)
    .json({ message: "invalid input" });
}
 
if(password!=cpassword){
    return res
    .status(400)
    .json({ message: "invalid input" }); 
}


  try {
    await new_user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: new_user });

})


app.post("/login",async(req,res)=>{

let data= new Loginuser({
    email:req.body.email,
    password:req.body.password
})

let userlogin;
try{
    userlogin=await User.findOne({email:req.body.email}).select("+password");
}catch(error){
console.log(error)
}
if(!userlogin){
    return res
    .status(400)
    .json({ message: "invalid credential" });
}
console.log(userlogin)
console.log(userlogin.password)
console.log(req.body.password)
if(userlogin.password == req.body.password){
 const token= await data.generateAuthToken();
 return res.status(200).json({
    status:"success",
    token
})
}
else{
    return res
    .status(400)
    .json({ message: "invalid input" });  
}

})


//user get _____

app.get("/data", auth,async(req,res)=>{

    try{
const data= await Userpost.find({userid:req.user})
res.send(data)
    }
    catch(error){
        res.status(401).send(error)
    }
})

app.get("/data/:id", (req,res)=>{

    Model.findById(req.params.id)
    .then(result=>{
       res.status(200).send(result)  
    })
   .catch(err=>{console.log("error")})  
   })




//user post _____

app.post("/posts",auth, async(req,res)=>{ 

    let input=req.user
const newpost=new Userpost({

    title:req.body.title,
    author:req.body.author,
    isbn:req.body.isbn,
    description:req.body.description,
    publisher:req.body.publisher,
    publishdate:req.body.publishdate,
    userid:input
})

try{
const result= await newpost.save()
        res.json({
            status:"success",
            result:result
        })
    }catch(error){
        res.status(401).send(error)
    }
})

app.put("/posts/:id",auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const data =await Userpost.findByIdAndUpdate(_id,req.body,{new:true})
        res.json({
            status:"success",
            result:data
        })
        }
        catch(err){
            res.status(401).send(error)
        }
})

app.delete("/posts/:id",auth,async(req,res)=>{
    try{
        const _id=req.params.id;
        const deletedata=await Userpost.findByIdAndDelete(_id,req.body)
        res.json({
            status:"Successfully deleted",
            result:deletedata
        })
            }
            catch(err){
               res.status(401).send(error)
            }
})





app.listen(port,()=>{console.log("server is up at 8000")})
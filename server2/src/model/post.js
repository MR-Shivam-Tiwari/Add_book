const mongoose=require("mongoose");
const Schema = mongoose.Schema;



const postSchema=new Schema({

    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
   isbn:{
        type:Number,
        required: true
    },
  description:{
        type:String,
        required: true
    },
   publisher:{
        type:String,
        required: true
    },
   publishdate:{
        type:Date,
        required: true,
    },
    userid:{type:String}

})

const Userpost=mongoose.model("Userpost",postSchema)

module.exports=Userpost
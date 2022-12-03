import '../css/form2.css'

import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Addcards(){
    const Navigate=useNavigate();
    const [user,setUser]=useState({})

    const [username,setUsername]=useState({})
 



const handleSubmit=(e)=> { // Once the form has been submitted, this function will post to the backend
    e.preventDefault();
    

const newNote={

title:username.title,
isbn:user.isbn,
 author:username.author,
 description:username.description,
publisher:username.publisher,
publishdate:username.publishdate


}
console.log(newNote)
if(newNote){

    axios.post("http://localhost:8000/posts", newNote,{
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       "authentication": localStorage.getItem("token"),
       "auth":localStorage.getItem("email")
     },
   })
    .then(res=>{
     //  console.log(res.status)
     alert("posted successfully")
     if(res.status===200){
         // console.log("hiiiiihii")
          Navigate("/home")
     } 
   })
   }
   else{
   alert("invalid input")
   }
   
}

    return(
        <>
<div className="container" id="dfr">

<h1>ADD BOOK</h1>
<form action="" onSubmit={handleSubmit}>

    <div className="inputBox">
        <span>Title of book</span>
        <input type="text" className="card-holder-input"  name="title" onChange={(e)=>setUsername({...username,title:e.target.value})} required />
    </div>

    <div className="inputBox">
        <span>ISBN</span>
        <input type="text" maxLength="10" className="card-number-input" name="isbn" pattern="[0-9]*" inputmode="numeric" onChange={(e)=>setUser({...user,isbn:e.target.value})} required/>
    </div>
    <div className="inputBox">
        <span>Description</span>
        <input type="text"  maxLength="16" className="card-holder-input"  name="description" onChange={(e)=>setUsername({...username,description:e.target.value})} required />
    </div>

    <div className="inputBox">
        <span>Author</span>
        <input type="text" className="card-holder-input"  name="author" onChange={(e)=>setUsername({...username,author:e.target.value})} required />
    </div>
    <div className="inputBox">
        <span>Publish date</span>
        <input type="date" className="card-holder-input"  name="publishdate" onChange={(e)=>setUsername({...username,publishdate:e.target.value})} required />
    </div>
    <div className="inputBox">
        <span>Publisher</span>
        <input type="text" className="card-holder-input"  name="publisher" onChange={(e)=>setUsername({...username,publisher:e.target.value})} required />
    </div>

    <input type="submit" value="submit" className="submit-btn"/>
</form>

</div>    
        </>
    )
}
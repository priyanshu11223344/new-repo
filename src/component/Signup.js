
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  let history=useNavigate();
  const [creds,setcreds]=useState({name:"",email:"",password:"",cpass:""})
  const onchange=(e)=>{
     setcreds({...creds,[e.target.name]:e.target.value})

  }
 
  const submit=async(e)=>{
    e.preventDefault();
    if(creds.password!==creds.cpass){
      alert("password do not match")
      return;
    }
    const url="http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST", 
    
      headers: {
        "Content-Type": "application/json",
         
        //here we dont require auth token because the response we are getting from this request contain auth-token so we will not hard code it 
       
      },
     
      body: JSON.stringify({name:creds.name,email:creds.email,password:creds.password}),
    
     
    })
    const json=await response.json();
    if(json.success ){
     // if success is true then we will save the auth token in local storage and will use useHistory hook to redirect to the page 
           await localStorage.setItem('token',json.authtoken)
         history("/home")


    }
    else{
     alert("enter valid details") 
    }
     
    console.log(json);
 //    console.log(creds);
 }
  return (
    <div className='container'>
      <form onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={ creds.name}onChange={onchange}name="name"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"onChange={onchange} value={creds.email} aria-describedby="emailHelp" required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="passsword" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"onChange={onchange}  value={creds.password}name="password" required minLength={(5)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"onChange={onchange}  name="cpass" values={creds.cpass} required minLength={(5)}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup

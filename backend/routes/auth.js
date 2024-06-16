const express = require("express");
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt=require('bcryptjs');
const JWT_SECRET="hello priyanshu";
const jwt=require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser")
//JSON WEB TOKEN IS BASICALLY A MEDIUM BETWEEN CLIENT AND SERVER THAT ESTABLISHES A SECURED CONNECTION
//using web token we dont need to login again and again

//ROUTE 1:CREAITNG A USER:NO LOGIN REQUIRED
router.post("/createuser", [
  body("name", "ENTER A VALID NAME").isLength({ min: 3 }),
  body("email", "ENTER A VALID EMAIL").isEmail(),
  body("password", "ENTER A VALID PASSWORD").isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  let success=false;
  //is there are no errors then errors will be empty
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
 

  try {
    // Check if user already exists
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({success, errors: [{ msg: "User already exists" }] });
    }
    const salt= await bcrypt.genSalt(10);
    //promises
    const secpass=await bcrypt.hash(req.body.password,salt);
    //after this we get secured password
    
    password=secpass;

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    await user.save();
    const data={
      id:user.id
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    // jwt.sign take two parameters one is data and that data is what we need to send for example here we use id of user because data retrieval is easy through id and the second parameter is the secret which we will use to check if the data of the secret has been updated or not
    //it is already a synchronous function so no need to use await
    //This is a secret key used to sign the token. It is crucial for security, as it is used to both create the signature of the token and later verify the token's authenticity. This key should be kept private and not shared publicly.
    
    res.json({success:true,token:authtoken});
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) { // Duplicate key error code
      return res.status(400).json({ success,errors: [{ msg: "Duplicate email, user already exists" }] });
    }
    res.status(500).send("Server error");
  }
});
//till here we created create user end point and now we are going to create a login endpoint

//ROUTE 2:LOGIN VALIDATION:NO LOGIN REQUIRED

router.post("/login", [

  body("email", "ENTER A VALID EMAIL").isEmail(),
  body("password", "ENTER A VALID PASSWORD").exists()
], async (req, res) => {
  const errors = validationResult(req);
  //is there are no errors then errors will be empty
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const{email,password}=req.body
  let success=false;
  try {
    let user= await User.findOne({email});
    if(!user){
      res.status(400).json({success,errors:"user does not exist"})
    }
    const passwordcompare= await bcrypt.compare(password,user.password);
    if(!passwordcompare){
        res.status(400).json({success,errors:"please enter valid details"})
    }
    else{
      const data={
        id:user.id
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      res.json({success:true,token:authtoken})
    }
  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) { // Duplicate key error code
      return res.status(400).json({ success,errors: [{ msg: "Duplicate email, user already exists" }] });
    }
    res.status(500).send("Server error");
  }
}

  
  
  )

  //ROUTE 3: GET LOGGED IN USER DETAILS :LOGIN REQUIRED
  router.post("/getdata",fetchuser, async (req, res) => {
 //here fetchuser is a middleware function we created because if there are multiple routes which require authentication then this middleware is used from this middleware we will access the is from the token first fetchuser will get load and after that async function will work

  try {
     const userId= await req.user.id
     // this the id of user w got from the token
      const user= await User.findById(userId).select("-password");
      //we will find if the user exist or not if yess then .select("-anything") will not take action on the value.In this -password we will not take any action on password
      res.send(user)
      

  } catch (error) {
    console.error(error.message);
    if (error.code === 11000) { // Duplicate key error code
      return res.status(400).json({ errors: [{ msg: "Duplicate email, user already exists" }] });
    }
    res.status(500).send("Server error");
  } 
  
  
  })
  


module.exports = router;

const express=require("express");
const router=express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser=require("../middleware/fetchuser")
const Note = require('../models/Notes');
router.get("/fetchnote",fetchuser, async (req,res)=>{
     //here we used a get request to fetch the data as we dont want to post anything we only require data
     //in this request we also used token from the header to ge the data
    try {
        const data=await Note.find({user:req.user.id})
        //here we will find the user in the Note is if exist it will send data and the data contain token which contain details
        res.json(data)
        
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) { // Duplicate key error code
          return res.status(400).json({ errors: [{ msg: "Duplicate email, user already exists" }] });
        }
        res.status(500).send("Server error");
      }
})
router.post("/addnote",fetchuser,  [
    body("title", "ENTER A VALID TITLE").isLength({ min: 3 }),
    body("description", "ENTER A VALID DESCRIPTION").isLength({ min: 3 }),
    body("tag", "ENTER A VALID TAG").isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
    //is there are no errors then errors will be empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tag}=req.body;
    const Newnote =  await new Note({
        title,description,tag,user:req.user.id
      });
      await Newnote.save();

      res.json(Newnote)


}
//2ND ENDPOINT:to update a note,for this we will require the user id to ensure which note is going to get update
//here we used a put request to update things
)
router.put('/updatenote/:id', fetchuser,async(req,res)=>{
     const {title,description,tag}=req.body;
     const updatednote={};
     if(title){updatednote.title=title}
     if(description){updatednote.description=description}
     if(tag){updatednote.tag=tag}
     //here we checked if the title description and tag exist or not if ye then add into the object

     //now we will find the user in the Note by userid and will check if it is the same user or not if yes then only note will get update
    try {
        let userid= await Note.findById(req.params.id)//req.params.id is used to find the id from specified url which means we have to pass user id in the request if we use req.user.id then it will give the id of specified user.
        if(!userid){
          return  res.status(401).send("user not found")
        }
        // now we will check if the note which is going to get update has the same user id or not
        if(userid.user.toString()!==req.user.id){
           return res.status(401).send("Not allowed")
        }
        userid=await Note.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true})
        res.json({userid})
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) { // Duplicate key error code
          return res.status(400).json({ errors: [{ msg: "Duplicate email, user already exists" }] });
        }
        res.status(500).send("Server error");
      }


    


     
}
 )
 //ENDPOINT 3:DELETE NOT:it will be same as updating a note but we will delete that for this find a suer with given id and delete the node
 router.delete("/deletenote/:id", fetchuser,async(req,res)=>{
    try {
        let userid= await Note.findById(req.params.id);
    if(!userid){
        return res.status(410).send("user not found");
    }
    //now check if the user is the same who posted the note
    if(userid.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }
    userid=await Note.findByIdAndDelete(req.params.id)
    res.json({"SUCCESS":"NOTE HAS BEEN DELETED",userid:userid})
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) { // Duplicate key error code
          return res.status(400).json({ errors: [{ msg: "Duplicate email, user already exists" }] });
        }
        res.status(500).send("Server error");
      }
})



module.exports=router;

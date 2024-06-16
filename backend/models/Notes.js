const mongoose=require('mongoose');
const {Schema}=mongoose;
const NoteSchema=new Schema({
      user:{
        type:mongoose.Schema.Types.ObjectId,
        //thus is done to link notes to user only other person cant see it
        ref:'User'
      },
      title:{
        type:String,
        required:true,
      },
      description:{
        type:String,
        required:true,
      },
      tag:{
        type:String,
        default:"General"
      },
      date:{
        type:Date,
        default:Date.now,
      }
})
module.exports=mongoose.model("notes",NoteSchema);
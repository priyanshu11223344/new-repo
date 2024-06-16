
const connectToMongo=require('./db');
const express=require('express');
const cors=require('cors')
const app=express();
connectToMongo();


app.use(express.json());//this is a middleware function used
app.use(cors());
app.get("/",(req,res)=>{
    res.send("this is express server");
})
app.use('/api/auth',require("./routes/auth"))
app.use('/api/notes',require("./routes/notes"))
app.listen(5000,()=>{
    console.log("working");
})
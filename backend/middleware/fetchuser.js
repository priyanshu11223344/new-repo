const JWT_SECRET="hello priyanshu";
const jwt=require('jsonwebtoken');
const fetchuser=(req,res,next)=>{
    //next is the next funcion to be called
    try {
        //get the user from json webtoken and add id to req object
        const token=req.header("auth-token");
        if(!token){
            res.status(401).json({error:"INVALID TOKEN"});
        }
        const data=jwt.verify(token,JWT_SECRET);
        // here verification will be dones
        req.user=data;
        next();


    } catch (error) {
        res.status(401).json({error:"INVALID TOKEN"});
    }
    
}





module.exports=fetchuser;
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const authMw = async(req,res,next)=>{
    try{
        let token = req.headers.authorization.split(" ")[1];
       if(!token){
            res.status(401).json({msg:"token missing"});
         }
         else{
           let decoder = jwt.verify(token,JWT_SECRET);
         }
         if(decoded){
            req.body.user = decoded.userId;
            next();
         }
         else{
            res.status(401).json({msg:"Invalid token"});
         }
    }
    catch(err){
        console.log(err);
        res.satus(500).json({msg:"Internal server error"});
    }
}
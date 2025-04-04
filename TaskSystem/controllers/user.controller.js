const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)||10;
const userController={
    signup : async (req,res)=>
        {
            try{
                let email = req.body.email;
                let rawPassword = req.body.password;
                    bcrypt.hash = bcrypt.hash(rawPassword, SALT_ROUNDS);
                    if(err){
                        return res.status(500).json({msg:"signup failerd"});
                    }
                    let user = { ...req.body, password: hash };
                    await UserModel.create(user);
                    res.status(201).json({ msg: "User created successfully" });
                } catch (err) {
                    res.status(500).json({ msg: "Signup failed", error: err });
                }  
        },
        login: async(req,res)=>{
           try {
             let user = await UserModel.findOne({email:req.body.email});
             if(!user){
                res.status(400).json({msg:"User not found"});
             }
             else{
                let rawPassword =req.body.password;
                let hashedPassword = user.password;
                bcrypt.compare(rawPassword,hashedPassword,(err,result))
                if(err){
                    res.status(500).json({msg:"login falied"});
                }
             }
             if(result){
                let data = {userId:user._id};
                let token = jwt.sign({data},JWT_SECRET,{expiresIn:"20 mins"});
             }
             res.status(200).json({msg:"login sucess",token});
           } catch (error) {
            res.status(500).json({msg:"try again to login"});
           }
        }
        
}
module.exports = userController;

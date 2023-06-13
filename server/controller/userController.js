const User = require("../model/User");
const bcrypt=require("bcrypt");
module.exports.registerController=async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        const checkUser=await User.findOne({username});
        if(checkUser)
        {
            res.json({message:"Username already exists",success:false});
        }
        const checkEmail=await User.findOne({email});
        if(checkEmail)
        {
            res.json({message:"User is already registered",success:false});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password:hashedPassword
        })
        delete user.password;
        res.json({success:true,message:"User Created Successfully",user});
    } catch (error) {
        console.log(error);
        res.json({message:"Error while creating user",success:false});
    }
}
module.exports.loginController=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            res.json({message:"Email or Password are incorrect",success:false});
        }
        const decode=await bcrypt.compare(password,user.password);
        if(!decode)
        {
            res.json({message:"Email or Password are incorrect",success:false});
        }
        delete user.password;
        res.json({success:true,message:"Logged in Successfully",user
        });
    } catch (error) {
        console.log(error);
        res.json({message:"Error while Logging in ",success:false});
    }
}
module.exports.setAvatarController=async(req,res)=>{
    try {
        const {image}=req.body;
        const user=await User.findByIdAndUpdate(req.params.id,{$set:{setAvatarImage:image,isAvatarImageSet:true}},{new:true});
        res.status(200).json({success:true,user});
        
    } catch (error) {
        console.log(error);
        res.json({message:"Error while setting avatar ",success:false});
    }
}
module.exports.getContactsController=async(req,res)=>{
    try {
        const user=await User.find({_id:{$ne:req.params.id}}).select("-password")
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json({message:"Error while getting contacts ",success:false});
    }
}
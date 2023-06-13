const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        min:4,
        max:20
    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    setAvatarImage:{
        type:String,
        default:""
    }
})
module.exports=mongoose.model("User",userSchema);
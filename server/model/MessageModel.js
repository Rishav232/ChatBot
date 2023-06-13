const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const messageSchema=new Schema({
    message:{
        text:{
            type:String,
            required:true,
        }
    },
        users:Array,
        sender:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    
},{timestamps:true})
module.exports=mongoose.model("Message",messageSchema);
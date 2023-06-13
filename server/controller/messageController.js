const Message = require("../model/MessageModel");

module.exports.addmessageController=async(req,res)=>{
 try {
    const {from,to,message}=req.body;
    const user=await Message.create({
        message:{text:message},
        users:[from,to],
        sender:from
    })
    res.json({message:"Succesfully created Message"})
 } catch (error) {
    console.log(error);
    res.json({message:"Error while sending message"})
 }
}
module.exports.getMessageController=async(req,res)=>{
    try {
      const {from,to}=req.body;
      const message=await Message.find({
        users:{
         $all:[from,to]
        }
      }).sort({updatedAt:1})
      
      const projectMessage=message.map((msg)=>{
         return {
            fromSelf:msg.sender.toString()===from,
            message:msg.message.text
         }
      })
      res.json(projectMessage);

    } catch (error) {
      console.log(error);
      res.json({message:"Error while retrieving message"})
    }
}
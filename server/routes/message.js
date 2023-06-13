const { addmessageController, getMessageController } = require("../controller/messageController");

const route=require("express").Router();

route.post("/addmessage",addmessageController);
route.post("/getAllMessages",getMessageController);

module.exports=route;
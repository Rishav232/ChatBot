const { registerController, loginController, setAvatarController, getContactsController } = require("../controller/userController");

const route=require("express").Router();

route.post("/register",registerController);
route.post("/login",loginController);
route.post("/setAvatar/:id",setAvatarController);
route.get("/getContacts/:id",getContactsController)
module.exports=route;
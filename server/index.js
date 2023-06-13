const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const socket=require("socket.io")
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery",true);

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("Connected to Mongo");
})
.catch((err)=>{
    console.log(err);
    console.log("Error");
})

app.use("/api/auth",require("./routes/user"))
app.use("/api/message",require("./routes/message"))
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})
global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
    
        onlineUsers.set(userId,socket.id);
        
    })
    socket.on("send-msg",(data)=>{
        // console.log(onlineUsers)
        const sendUserSocket=onlineUsers.get(data.to);
        // console.log(sendUserSocket)
        if(sendUserSocket)
        {
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
            
            
        }
    })
})

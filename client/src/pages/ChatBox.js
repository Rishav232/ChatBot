import React, { useEffect, useState,useRef} from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import {v4 as uuidv4}from "uuid";
const ChatBox = ({ currchat,currUser ,socket}) => {
  const scrollRef=useRef();
  const [chats, setchats] = useState([]);
  const [arrival, setarrival] = useState(null);
  const handleSendMessage=async(msg)=>{

    socket.current.emit("send-msg",{
      from:currUser?._id,
      to:currchat?._id,
      message:msg
     });
       await axios.post("/api/message/addmessage",{
        from:currUser?._id,
        to:currchat?._id,
        message:msg
       })
      //  console.log(socket.current);
       
       const msgs=[...chats];
       msgs.push({fromSelf:true,message:msg});
       setchats(msgs);
  }
  useEffect(() => {
   if(socket.current)
   {
    socket.current.on("msg-recieve",(msg)=>{
      setarrival({fromSelf:false,message:msg})
    })
   }
  }, [])
  useEffect(()=>{
   arrival && setchats((prev)=>[...prev,arrival]);
  },[arrival])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
  },[chats])
  useEffect(()=>{
    fetchChats();
  },[currchat])

  const fetchChats=async()=>{
    const {data}=await axios.post("/api/message/getAllMessages",{
      from:currUser?._id,
      to:currchat?._id,
    })
    setchats(data);
  }
  return (
    currchat.setAvatarImage&&<Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currchat.setAvatarImage}`} alt="avatar" />
          </div>
          <div className="username">
            <h2>{currchat?.username}</h2>
          </div>
        </div>
        <Logout/>
      </div>
      <div className="chat-body">
         {chats?.map((chat,index)=>{
          return <div ref={scrollRef} key={uuidv4()} >
            <div className={`chat ${chat?.fromSelf?"sender":"recieved"}`}>
              <div className="chat-message">
              {chat?.message}
              </div>
            </div>
          </div>
         })}
      </div>
        <ChatInput handleSendMessage={handleSendMessage}/>
    </Container>
  )
}
// 2:47:32
const Container = styled.div`
display:grid;
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow: hidden;
.chat-header{
display:flex;
background-color:#0d0d30;
align-items:center;
justify-content:space-between;
gap:1rem;

.user-details
{
  display:flex;
  gap:1rem;
  align-items:center;
  .avatar
  {
      margin-left:0.5rem;
      img
      {
          height:2rem;
      }
      
  }
  .username
  {
    color:white;
  }
}
}
.chat-body {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .chat {
    display: flex;
    align-items: center;
    .chat-message {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sender {
    justify-content: flex-end;
    .chat-message {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .chat-message {
      background-color: #9900ff20;
    }
  }
}
`;

export default ChatBox
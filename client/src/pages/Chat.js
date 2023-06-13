import axios from 'axios';
import React, { useEffect, useState ,useRef} from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Contacts from './Contacts';
import Welcome from './Welcome';
import ChatBox from './ChatBox';
import {io} from "socket.io-client"
const Chat = () => {
  const socket=useRef();
  const [currUser, setcurrUser] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);
  const [currchat, setcurrchat] = useState(undefined);
const navigate=useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("chat-user"))
    navigate("/login");
    else
    setcurrUser(JSON.parse(localStorage.getItem("chat-user")));
  }, [])
  
  const fetchContacts=async()=>{
    try {
      const {data}=await axios.get(`api/auth/getContacts/${currUser._id}`);
      setContacts(data);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching contacts")
    }
  }
  useEffect(() => {
    if(currUser)
    {
      if(currUser.isAvatarImageSet)
      {
        fetchContacts();
      }
      else
      navigate("/setavatars");
    }
    
  }, [currUser])
  useEffect(() => {
    if(currUser)
    {
      socket.current=io("http://localhost:5000");
      socket.current.emit("add-user",currUser._id)

    }

  }, [currUser])
  

  const handleChangeChat=(chat)=>{
    setcurrchat(chat);
  }
  return (
    <Container>
      <div className="title">
        <Contacts contacts={contacts} currUser={currUser} changeChat={handleChangeChat}/>
        {currchat===undefined?(<Welcome currUser={currUser}/>):
        (
          <ChatBox currchat={currchat} currUser={currUser} socket={socket}/>
        )}
        
      </div>
      
      
    </Container>
  )
}
const Container=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:1rem;
background-color:#131324;
.title{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width:720px)and(max-width:1080px){
    grid-template-columns:35% 65%;
  }
}
`
export default Chat
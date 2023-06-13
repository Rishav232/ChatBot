import React, { useEffect } from 'react'
import styled  from 'styled-components';
import Logo from "../assets/logo.svg";
import { useState } from 'react';
const Contacts = ({contacts,currUser,changeChat}) => {
  const [currUserName, setcurrUserName] = useState(undefined);
  const [currUserimage, setcurrUserimage] = useState(undefined);
  const [currSelected, setcurrSelected] = useState(undefined);

  useEffect(() => {
    if(currUser)
    {
      setcurrUserName(currUser?.username);
      setcurrUserimage(currUser?.setAvatarImage);
    }
  }, [currUser])
  const handleChat=(index,contact)=>{
    setcurrSelected(index)
    changeChat(contact);
  }
  return (
    <Container>
    <div className='brand'>
     <img src={Logo} alt="Logo" />
     <h3>ChatBot</h3>
    </div>
    <div className="contacts">
       {contacts?.map((c,index)=>{
        return <div key={index} className={`avatar ${currSelected===index?"selected":""}`} onClick={()=>{handleChat(index,c)}}>
          <img src={`data:image/svg+xml;base64,${c.setAvatarImage}`} alt="avatar"/>
          <h4>{c.username}</h4>
        </div>
       })}
    </div>
    
    <div className="user">
    {currUserimage&&<img src={`data:image/svg+xml;base64,${currUserimage}`} alt="avatar"/>}
          <h2>{currUserName}</h2>
    </div>
    </Container>
  )
}
const Container=styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
.brand{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:0.8rem;
  img{
    height:2rem;
  }
  h3{
    color:white;
  }
}
.contacts{
  display:flex;
  flex-direction:column;
  overflow:auto;
  align-items:center;
  gap:0.8rem;
  &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color:#ffffff39;
      width:0.1rem;
      border-radius:1rem;
    }
  }
  .avatar{
    background-color:#ffffff39;
    min-height:5rem;
    width:90%;
    cursor:pointer;
    border-radius:0.2rem;
    display:flex;
    align-items:center;
    gap:1rem;
    transition:0.5s ease-in-out;
    img{
      margin-left:0.5rem;
      height:3rem;
    }
    h4{
      color:white;
    }
  }
  .selected{
    background-color:#9186f3;
  }
} 
.user{
  background-color:#0d0d30;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:1rem;
  img{
    height:4rem;
    max-inline-size:100%;
  }
  h2{
    color:white;
  }
}
@media screen and (min-width:720px)and(max-width:1080px){
  gap:0.5rem;
  .avatar{
     h4{
      font-size:1rem;
     }
  }
  .user{
    h2{
      font-size:1rem;
    }
  }
}
`;
export default Contacts
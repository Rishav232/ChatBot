import React, { useState } from 'react'
import { styled } from 'styled-components';
import EmojiPicker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
const ChatInput = ({handleSendMessage}) => {
    const [showEmoji, setShowemoji] = useState(false);
    const [msg, setmsg] = useState("")
    const handleEmoji=()=>{
        setShowemoji(!showEmoji);
    }
    const handleaddemoji=(e)=>{
        
        let message=msg;
        message+=e.emoji;
        // console.log(message);
        setmsg(message);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        handleSendMessage(msg);
        setmsg("");

    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmoji}/>
                    {showEmoji&&<EmojiPicker onEmojiClick={handleaddemoji}/>}
                </div>
            </div>
        
                 <form className='input-container' onSubmit={handleSubmit}>
                    <input type="text" placeholder='please enter your message here' value={msg} onChange={(e)=>{setmsg(e.target.value)}}/>
                    <button className='submit'>
                      <IoMdSend/>
                    </button>
                 </form>
            
        </Container>
    )
}
const Container = styled.div`
display:grid;
grid-template-columns:5% 95%;
align-items:center;
padding:0 2rem;
@media screen and (min-width:720px) and (max-width:1080px){
 padding:0 1rem;
 gap:1rem;
}
.button-container
{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    .emoji
    {
        position:relative;
        svg{
            font-size:1.3rem;
            color:#ffff00c8;
            cursor:pointer;
        }

        .EmojiPickerReact{
            position:absolute;
            top:-450px;
            background-color:#080420;
            box-shadow:0 5px 10px #9186f3;
            border-color:#9186f3;
            &::-webkit-scrollbar{
                #080420;
              }
            .epr-search{
                background-color:transparent;
                border-color:#9186f3;
            }
            .epr-emoji-category-label{
                background-color:transparent;
            }
        }
    }
}
.input-container{
    display:flex;
    width:100%;
    border-radius:2rem;
    gap:6rem;
    align-items:center;
    background-color:#ffffff39;
    input{
        width:80%;
        height:60%;
        background-color:transparent;
        border:none;
        color:white;
        padding-left:1rem;
        font-size:1.5rem;
        &::selection{
            background-color:#9186f3;
        }
        &:focus{
            outline:none;
        }
    }
    button{
        padding:0.4rem 2rem;
        border-radius:2rem;
        border:none;
        background-color:#9186f3;
        @media screen and (min-width:720px) and (max-width:1080px){
            padding:0.3rem 1rem;
            svg{
                font-size:1rem;
            }
        }
        svg{
            
            color:white;
        }
    }
}
`;
export default ChatInput
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Loader from "../assets/loader.gif";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Buffer } from 'buffer';
const SetAvatars = () => {
    const navigate=useNavigate();
    const api = "https://api.multiavatar.com"
    const [avatars, setavatars] = useState([]);
    const [loading, setloading] = useState(true);
    const [selectedAvatar, setselectedAvatar] = useState(undefined);
    let toastOptions={
        position: 'bottom-right',
        duration: 2000,
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff'
        }
    }
    const setProfile=async()=>{
        // console.log(selectedAvatar);
        if(selectedAvatar===undefined)
        {
            toast.error("Please select any image",toastOptions);
        }
        else
        {
            let user=JSON.parse(localStorage.getItem("chat-user"));
            const {data}=await axios.post(`/api/auth/setAvatar/${user._id}`,{
                image:avatars[selectedAvatar]
            })
            if(data.user.isAvatarImageSet)
            {
                // console.log("Image Set Successfully");
                user.isAvatarImageSet=true;
                user.setAvatarImage=avatars[selectedAvatar];
                localStorage.setItem("chat-user",JSON.stringify(user));
                navigate("/");
            }
        }
    }
    useEffect(() => {
      if(!localStorage.getItem("chat-user"))
      navigate("/login");
    }, [])
    
    const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++)//everytime bring 4 avatar
        {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=p3ABv5YqJhGn9e`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString('base64'));
        }
        setavatars(data);
        setloading(false);
    }
    useEffect(() => {
       fetchData();
    }, [])
    return (
        <>
        {loading?(<Container>
            <img src={Loader} alt="Loader" />
        </Container>):(
        <Container>
            <div className='title'>
                {<div className="profilePicture">
                    <img src="" alt="" />
                </div>}
                <h1>Pick your Avatar as your Profile Picture</h1>
            </div>
            <div className="avatars">
                {avatars?.map((avatar, index) => {
                    return <div key ={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => { setselectedAvatar(index) }} />
                    </div>
                })}
            </div>
            <button className='btn-avatar' onClick={setProfile}>Set as Profile Photo</button>
        </Container>)}
        <Toaster/>
        </>
    )
}
const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
height:100vh;
width:100vw;
gap:3rem;
background-color:#131324;
    .title{
            h1{
            color:white;
            }
    }
    .avatars
    {
        display:flex;
        gap:2rem;
        .avatar
        {
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.2s ease-in-out;
        
            img
            {
                height:6rem;
            }
        }
        .selected
        {
            border:0.4rem solid #4e0eff
        }
    }
    .btn-avatar
    {
        background-color:#997af0;
        padding:1rem;
        text-transform:uppercase;
        color:white;
        font-weight:bold;
        cursor:pointer;
        transition:0.3s ease-in-out;
        &:hover{
            background-color:#4e0eff
        }
    }
`
;
export default SetAvatars
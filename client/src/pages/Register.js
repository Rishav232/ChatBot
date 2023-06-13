import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo.svg";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const Register = () => {
    const navigate=useNavigate();
    const [values, setvalues] = useState({ username: "", email: "", password: "", confirmpassword: "" });
    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const handleValidation = () => {
        const { username, email, password, confirmpassword } = values;
        if (password !== confirmpassword) {
            toast.error("Password and Confirm Password do not match", {
                position: 'bottom-right',
                duration: 2000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                }
            })
            return false;
        }
        else if (username.length < 3) {
            toast.error("Username should be more than 3 characters", {
                position: 'bottom-right',
                duration: 2000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                }
            })
            return false;
        }
        else if (email === "") {
            toast.error("Email cannot be blank", {
                position: 'bottom-right',
                duration: 2000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                }
            })
            return false;
        }
        return true
    }
    useEffect(() => {
        if(localStorage.getItem("chat-user"))
        {
          navigate("/")
        }
      }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = values;
            const { data } = await axios.post("/api/auth/register",
                {
                    username,
                    email,
                    password
                })
            if (data.success === false)
                toast.error(data.message, {
                    position: 'bottom-right',
                    duration: 2000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff'
                    }
                })

            if (data.success === true) {
                navigate("/setavatars");
            }
        }

    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={Logo} alt={Logo} />
                        <h1>ChatBot</h1>
                    </div>

                    <input type="text" name="username" id="Username" placeholder='Username' onChange={(e) => { handleChange(e) }} />
                    <input type="email" name="email" id="email" placeholder='Email' onChange={(e) => { handleChange(e) }} />
                    <input type="password" name="password" id="password" placeholder='Password' onChange={(e) => { handleChange(e) }} />
                    <input type="password" name="confirmpassword" id="confirmpassword" placeholder='Confirm Password' onChange={(e) => { handleChange(e) }} />
                    <button>Create Account</button>
                    <span>Already have an account?<Link to="/login"> Sign in</Link></span>
                </form>
            </FormContainer>
            <Toaster />
        </>
    )
}
const FormContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand{
    display:flex;
    justify-content:center;
    gap:1rem;
    align-items:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    padding:3rem 5rem;
    border-radius:2rem;

    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        font-size:1rem;
        width:100%;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
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
    span{

        color:white;
        text-transform:uppercase;
        a{
            color:blue;
            text-decoration:none;
            font-weight:bold;
        }
    }
  }

`;
export default Register
import React from 'react'
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
const Logout = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Container onClick={handleClick}>
        <BiPowerOff/>
        <h4>Logout</h4>
    </Container>
  )
}
const Container=styled.div`
display:flex;
flex-direction:column;
gap:0.2rem;
justify-content:center;
align-items:center;
margin-right:1rem;
cursor:pointer;
h4{
    color:#ebe7ff;
}
svg{
    font-size:1.3rem;
    color:#ebe7ff;
}
`;
export default Logout
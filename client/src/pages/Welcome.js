import React from 'react'
import Roboto from "../assets/robot.gif"
import  styled from 'styled-components'
const Welcome = ({currUser}) => {
  return (
    <Container>
        <img src={Roboto} alt="" />
        <h1>
            Welcome , <span>{currUser?.username}</span>
        </h1>
        <h3>
        Please Select a Chat to Start Messaging.
        </h3>
    </Container>
  )
}
const Container=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:white;
img{
    height:20rem;
}
span{
    color:#4e00ff
}
`;
export default Welcome
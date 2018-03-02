import React from 'react'

import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  margin: 0 10px 0 0;
  padding: 5px 15px;
  font-size: 17px;
  font-family: sans-serif;
  line-height: 1.8;
  appearance: none;
  box-shadow: none;
  border-radius: 3px;
  color: #fff;
  border: none;
 
   &:hover {
     background-color: #346392;
    };
    
  ${props => (props.basic ? `
    color: #6496c8; 
    background-color: rgba(0,0,0,0);
    border: solid 1px #27496d;
    color: #fff;
    
    &:hover {
    background-color: #27496d;
    border: solid 1px #27496d;
    color: #fff;
    }` :
    `background-color: #6496c8;`)};
   
  
  background-color: ${props => (props.active === true ? "#27496d" : "")};
  background-color: ${props => (props.active === true && props.basic ? "#27496d" : "")};
  
`;

export default Button;

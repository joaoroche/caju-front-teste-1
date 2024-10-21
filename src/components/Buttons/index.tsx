import styled from "styled-components";

const Button = styled.button`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: #64a98c;
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    background-color: #4c8b71;
  } 

  &:active {
    background-color: #3d6b5a;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }

  &:focus {
    background-color: #4c8b71;
  }
  
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? 'none'};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;
`;


export default Button;

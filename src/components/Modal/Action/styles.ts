import styled from 'styled-components';
import Button from "~/components/Buttons";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  outline: none;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-top: 20px;
`;

export const CancelButton = styled(Button)`
  background-color: white;
  color: black;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }

  &:active {
    background-color: #e1e1e1;
  }

  &:focus {
    background-color: #f1f1f1;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
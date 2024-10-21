import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

export const ErrorTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const ErrorMessage = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ErrorDetails = styled.pre`
  font-size: 14px;
  color: #721c24;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 5px;
  max-width: 80%;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
`;
import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.header`
  animation: ${appearFromTop} 1s;
  height: 9vh;
  background: #774dd6;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin-left: 500px;
    margin-right: 500px;
    color: #d4c2ff;
    font-family: 'Archivo';
    font-weight: 400;
  }
`;

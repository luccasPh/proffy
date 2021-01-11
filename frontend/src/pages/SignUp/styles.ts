import styled, { keyframes } from 'styled-components';
import backgroundImg from '../../assets/images/background-2.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  font-family: 'Poppins';
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(+50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromRight} 1s;
  img {
    margin-bottom: 40px;
  }
  form {
    width: 400px;
    text-align: center;
    h1 {
      color: #32264d;
      margin-bottom: 20px;
      margin-right: 210px;
      text-align: justify;
    }
    p {
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: 400;
      text-align: start;
      max-width: 230px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) #8257e5 no-repeat center;
  background-size: auto;
`;

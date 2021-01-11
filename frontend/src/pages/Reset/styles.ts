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
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
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
  form {
    width: 400px;
    text-align: center;
    margin-top: 60px;
    h1 {
      color: #32264d;
      margin-bottom: 20px;
      margin-right: 210px;
      text-align: justify;
    }
    h3 {
      margin-bottom: 20px;
      padding-bottom: 30px;
      text-align: justify;
      font-weight: 400;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) #8257e5 no-repeat center;
  background-size: auto;
`;

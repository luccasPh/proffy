import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s;
  form {
    margin: 80px 0;
    width: 380px;
    text-align: center;
    h1 {
      font-size: 36px;
      color: #32264d;
      margin-bottom: 40px;
    }
    a {
      display: block;
      margin-top: 30px;
      text-decoration: none;
      color: #9c98a6;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#9c98a6')};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) #8257e5 no-repeat center;
  background-size: auto;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  h3 {
    margin-right: 140px;
    font-weight: 400;
  }
  a {
    display: block;
    text-decoration: linen;
    color: #8257e5;
    transition: color 0.2s;
    font-weight: 600;
    &:hover {
      color: ${shade(0.2, '#8257E5')};
    }
  }
  span {
    display: flex;
    flex-direction: row;
    color: #9c98a6;
  }
`;

import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../assets/images/background-1.svg';

const appearFromBehind = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: url(${backgroundImg}) #8257e5 no-repeat center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: ${appearFromBehind} 1s;
  h1 {
    font-family: 'Archivo';
    color: #fff;
    font-size: 54px;
    margin-top: 20px;
  }
  p {
    color: #d4c2ff;
    margin-top: 20px;
    margin-bottom: 60px;
    font-family: 'Poppins';
  }
  a {
    padding: 16px 30px;
    place-content: center;
    color: #f4ede8;
    background: #04d361;
    text-decoration: none;
    transition: color 0.2s;
    font-family: 'Archivo';
    font-weight: 600;
    border-radius: 10px;
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

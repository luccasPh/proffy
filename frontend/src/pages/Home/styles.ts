import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(+50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  background: #8257e5;
  height: 70vh;
  display: flex;
  justify-content: center;
  font-family: 'Poppins';
`;

export const Content = styled.div`
  animation: ${appearFromTop} 1s;
`;

export const HeaderContent = styled.div`
  margin: 30px 0 20px;
  a {
    color: #d4c2ff;
    background: #774dd6;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    height: 40px;
    width: 40px;
    transition: color 0.2s;
    cursor: pointer;
    &:hover {
      background: ${shade(0.2, '#774DD6')};
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  p {
    padding-left: 10px;
    padding-top: 10px;
    color: #d4c2ff;
    &:hover {
      color: ${shade(0.2, '#d4c2ff')};
    }
  }
`;

export const BodyContent = styled.div`
  display: flex;
  > img + img {
    margin-left: 90px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  animation: ${appearFromBottom} 1s;
  margin-top: 80px;
  h3 {
    margin-right: 10%;
    width: 173px;
    font-weight: 400;
    color: #6a6180;
    strong {
      display: block;
      width: 200px;
    }
  }
  p {
    color: #9c98a6;
    font-size: smaller;
    width: 210px;
    text-align: end;
    img {
      margin-left: 5px;
      opacity: 0.8;
    }
  }
  button {
    width: 282px;
    height: 104px;
    img,
    span {
      vertical-align: middle;
      margin-right: 20px;
    }
  }
  button + button {
    margin-left: 15px;
  }
`;

export const Loading = styled.div`
  .css-kryag9-SkeletonTheme {
    display: flex;
    justify-content: space-between;
  }
`;

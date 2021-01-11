import styled, { keyframes } from 'styled-components';

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

export const Container = styled.div`
  font-family: 'Poppins';
  .card-container {
    .end-text {
      margin-left: 30%;
      margin-right: 40%;
      margin-top: 50px;
      margin-bottom: 50px;
      color: #9c98a6;
      text-align: center;
      width: 500px;
    }
  }
`;

export const Card = styled.div`
  background: #fff;
  width: 736px;
  height: 595px;
  margin-left: 22%;
  margin-bottom: 25px;
  border-radius: 8px;
  padding: 30px 30px 0 30px;
  .card-header {
    display: flex;
    align-items: center;
    img {
      border-radius: 80%;
      height: 70px;
      width: 70px;
      margin-right: 20px;
    }
    h3 {
      font-weight: 700;
      font-family: 'Archivo';
      color: #32264d;
      font-size: 24px;
      span {
        display: block;
        font-weight: 400;
        font-family: 'Poppins';
        font-size: 16px;
      }
    }
  }
  .card-body {
    margin-top: 40px;
    background: transparent;
    textarea {
      height: 150px;
      width: 616px;
      font-family: 'Poppins';
      font-weight: 400;
      color: #6a6180;
      font-size: 16px;
      resize: none;
      border: none;
      margin-bottom: 20px;
    }
    .minicard-container {
      display: flex;
      div + div {
        margin-left: 15px;
      }
    }
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    width: 736px;
    background: #fafafc;
    border-top: 1px solid #e6e6f0;
    margin-top: 30px;
    margin-left: -29px;
    h3 {
      margin-left: -220px;
      color: #8257e5;
      font-family: 'Archivo';
      font-weight: 700;
      font-size: 20px;
    }
    p {
      margin-left: 25px;
      color: #9c98a6;
      font-weight: 400;
      font-size: 14px;
    }
    button {
      margin-right: 35px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 10px;
      }
    }
  }
`;

export const MiniCard = styled.div`
  height: 136px;
  width: 122px;
  background: #fafafc;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  padding: 15px;
  h3 {
    font-family: 'Archivo';
    font-weight: 700;
    color: #6a6180;
    font-size: 15px;
  }
  p {
    font-weight: 400;
    font-size: 12px;
    color: #9c98a6;
  }
  .day {
    margin-bottom: 20px;
  }
`;

export const Filters = styled.div`
  background: transparent;
  margin-left: 22%;
  margin-top: -75px;
  animation: ${appearFromBottom} 1s;
  form {
    margin-bottom: 20px;
    display: flex;
    label {
      color: #d4c2ff;
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
  font-size: large;
  align-items: center;
  padding-top: 25px;
  img {
    border-radius: 80%;
    height: 60px;
    width: 60px;
    margin-right: 20px;
  }
`;

export const Background = styled.div`
  height: 35vh;
  background: #8257e5;
  animation: ${appearFromTop} 1s;
  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-left: 35px;
    h1 {
      color: #fff;
      font-family: 'Archivo';
      font-weight: 700;
      width: 400px;
      margin-left: 20%;
      padding-top: 80px;
    }
    div {
      margin-left: 13%;
      margin-bottom: 10px;
      color: #d4c2ff;
      display: flex;
      img {
        margin-right: 20px;
      }
      p {
        width: 120px;
        font-size: smaller;
      }
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

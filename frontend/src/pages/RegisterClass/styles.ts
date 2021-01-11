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
  height: 50vh;
  width: 100%;
  background: #8257e5;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins';
  margin-bottom: 40px;
`;

export const Main = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 60px;
  width: 736px;
  max-width: 736px;
  overflow: hidden;
  animation: ${appearFromBottom} 1s;

  .schedule-items {
    display: contents;
  }

  form {
    fieldset {
      border: 0;
      flex-flow: wrap;
    }
    fieldset,
    legend {
      color: #32264d;
      font-family: 'Archivo';
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 25px;
      font-size: x-large;
    }
    legend {
      border-bottom: 1px solid #e6e6f0;
      .add-schedule {
        font-size: medium;
        color: #8257e5;
        cursor: pointer;
        -webkit-user-select: none;
      }
    }
    fieldset + fieldset {
      margin-top: 40px;
    }
    .del-schedule {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid #e6e6f0;
      line-height: 0.1em;
      margin: 20px 0 0;
      span {
        color: #e33d3d;
        font-size: 14px;
        background: #fff;
        padding: 0 20px;
        cursor: pointer;
        -webkit-user-select: none;
      }
    }
  }
  footer {
    background: #fafafc;
    border-top: 1px solid #e6e6f0;
    width: 736px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 136px;
    margin: 40px 0 -50px -60px;
    p {
      font-size: 12px;
      margin-left: -85px;
      margin-right: 20px;
      color: #a0a0b2;
      span {
        color: #8257e5;
      }
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
  font-size: large;
  align-items: center;
  padding-top: 25px;
  img {
    border-radius: 50%;
    height: 60px;
    width: 60px;
    margin-right: 20px;
  }
`;

export const Titles = styled.div`
  width: 736px;
  margin: -40px 0 24px;
  animation: ${appearFromTop} 1s;
  h1 {
    color: #fff;
    font-family: 'Archivo';
    font-weight: 700;
    width: 350px;
    padding-top: 80px;
  }
  div {
    display: flex;
    margin-top: 20px;
    color: #d4c2ff;
    h3 {
      width: 350px;
      font-weight: 400;
      font-size: medium;
      margin-bottom: 15px;
    }
    img {
      margin: 0 10px 25px 250px;
    }
    p {
      width: 120px;
      font-size: smaller;
      span {
        display: block;
        width: 200px;
      }
    }
  }
`;

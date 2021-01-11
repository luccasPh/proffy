import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import profileBackground from '../../assets/images/profile-background.svg';

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

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const FormSections = styled.div`
  > div + div {
    margin-top: 40px;
  }
`;

export const Section = styled.div`
  animation: ${appearFromTop} 1s;
  background: #fff;
  border-radius: 5px;
  padding: 60px;
  margin-top: -60px;
  width: 736px;
  animation: ${appearFromBottom} 1s;
  font-family: 'Poppins';
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
    .schedule-dele {
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
      max-width: 250px;
      span {
        color: #8257e5;
      }
    }
    button {
      width: 229px;
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

export const Background = styled.div`
  height: 60vh;
  width: 100%;
  background: #8257e5;
  animation: ${appearFromTop} 1s;
`;

export const AvatarInput = styled.div`
  background: url(${profileBackground});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1115px;
  height: 392px;
  margin-left: 110px;
  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  label {
    width: 48px;
    height: 48px;
    background: #04d361;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: -50px;
    margin-left: 125px;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
  .user-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    h1 {
      font-weight: 700;
      font-family: 'Archivo';
      font-size: 36px;
      color: #fff;
      padding-top: 30px;
    }
    p {
      font-family: 'Poppins';
      font-weight: 400;
      font-size: 24px;
      color: #d4c2ff;
    }
  }
`;

export const AvatarLoading = styled.div`
  .css-kryag9-SkeletonTheme {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FormLoading = styled.div`
  margin-top: -50px;
`;

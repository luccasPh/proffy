import styled from 'styled-components';

export const Container = styled.div`
  background: #fafafc;
  width: 383px;
  height: 56px;
  border: 1px solid #e6e6f0;
  color: #9c98a6;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  border-radius: 10px 10px 10px 10px;
  margin-top: 50px;
  .select {
    width: 95%;
    background: transparent;
    flex: 1;
    border: 0;
    color: #c1bccc;
    padding-left: 20px;
    padding-top: 7px;
    font-family: 'Poppins';
    font-weight: 400;
    .content__control {
      border-style: unset;
      box-shadow: initial;
      background: transparent;
    }
    .content__value-container {
      font-size: initial;
    }
    .content__placeholder {
      color: #c1bccc;
    }
    .content__menu {
      font-size: medium;
      color: #6a6180;
    }
    .content__single-value {
      color: #6a6180;
    }
  }
  label {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    margin-top: -30px;
    margin-bottom: 10px;
  }
`;

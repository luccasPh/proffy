import styled from 'styled-components';

export const Container = styled.div`
  background: #fafafc;
  width: 246px;
  height: 54px;
  border: 1px solid #e6e6f0;
  color: #9c98a6;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  border-radius: 10px 10px 10px 10px;
  margin-top: 50px;
  label {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    margin-top: -30px;
    margin-bottom: 10px;
  }
  input {
    height: 72px;
    background: transparent;
    flex: 1;
    border: 0;
    color: #6a6180;
    padding-left: 20px;
  }
`;

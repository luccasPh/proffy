import styled from 'styled-components';

interface ContainerProps {
  display: string;
}

export const Container = styled.div<ContainerProps>`
  background: #fafafc;
  padding: 0 0 0 20px;
  height: 56px;
  border: 1px solid #e6e6f0;
  color: #9c98a6;
  border-radius: 10px 10px 10px 10px;
  margin-top: 50px;
  display: ${(props) => props.display};
  flex-direction: column;
  .show-password {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 10px;
    input {
      height: 58px;
      background: transparent;
      border: 0;
      color: #6a6180;
    }
    i {
      cursor: pointer;
    }
  }

  label {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    margin: -30px 0 10px -18px;
  }
`;

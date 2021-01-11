import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  Position: string;
}

export const Container = styled.div<ContainerProps>`
  background: #fafafc;
  padding: 0 0 0 20px;
  width: 100%;
  border: 1px solid #e6e6f0;
  color: #9c98a6;
  display: flex;
  align-items: center;
  ${(props) =>
    props.Position === 'single' &&
    css`
      border-radius: 10px 10px 10px 10px;
    `}
  ${(props) =>
    props.Position === 'top' &&
    css`
      border-radius: 10px 10px 0 0;
    `}
  ${(props) =>
    props.Position === 'fixed' &&
    css`
      border-radius: 0 0 0 0;
    `}
  ${(props) =>
    props.Position === 'bottom' &&
    css`
      border-radius: 0 0 10px 10px;
    `}

  input {
    height: 72px;
    background: transparent;
    flex: 1;
    border: 0;
    padding-top: 20px;
    font-size: 20px;
    color: #6a6180;
  }
  label {
    pointer-events: none;
    position: absolute;
    color: #9c98a6;
    transition: all 0.2s ease-out;
    ${(props) =>
      props.isFocused &&
      css`
        transform: translateY(-14px);
        font-size: 13px;
        color: #c1bccc;
      `}
  }
  i {
    cursor: pointer;
    margin-right: 20px;
  }
`;

import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.button<ContainerProps>`
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;
  font-family: 'Archivo';
  ${(props) =>
    props.disabled
      ? css`
          background: #dcdce5;
          color: #9c98a6;
          cursor: not-allowed;
        `
      : css`
          background: ${props.backgroundColor};
          color: #fff;
          cursor: pointer;
          &:hover {
            background: ${shade(0.2, `${props.backgroundColor}`)};
          }
        `}
`;

import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface PlaceholderProps {
  isFocused: boolean;
  isError: boolean;
}

export const Container = styled.View`
  background: #fafafc;
  padding: 0 0 0 20px;
  width: 311px;
  height: 64px;
  border: 1px solid #e6e6f0;
  color: #9c98a6;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'Poppins_400Regular';
  color: #6a6180;
  padding-top: 20px;
`;

export const PlaceholderText = styled.Text<PlaceholderProps>`
  color: #9c98a6;
  font-family: 'Poppins_400Regular';
  position: absolute;
  color: ${(props) => (props.isError ? '#E83F5B' : '#9c98a6')};
  margin-left: 20px;
  ${(props) =>
    props.isFocused &&
    css`
      transform: translateY(-14px);
      font-size: 13px;
      color: ${props.isError ? '#E83F5B' : '#c1bccc'};
    `}
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;

export const HiddenButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

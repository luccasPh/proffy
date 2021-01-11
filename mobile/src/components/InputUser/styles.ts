import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface LabelProps {
  isError: boolean;
}

export const Container = styled.View`
  background: #fafafc;
  padding: 0 0 0 20px;
  height: 56px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-around;
`;

export const TextInput = styled.TextInput`
  font-size: 16px;
  font-family: 'Poppins_400Regular';
  color: #6a6180;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-right: 20px;
`;

export const Label = styled.Text<LabelProps>`
  color: ${(props) => (props.isError ? '#E83F5B' : '#9c98a6')};
  font-family: 'Poppins_400Regular';
  margin-top: -35px;
  margin-left: -20px;
  margin-bottom: -10px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;

export const HiddenButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

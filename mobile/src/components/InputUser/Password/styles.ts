import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface LabelProps {
  isError: boolean;
}

export const Container = styled.View`
  background: #fafafc;
  padding: 0 0 0 20px;
  width: 295px;
  height: 56px;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  flex-direction: column;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 85%;
`;

export const TextInput = styled.TextInput`
  font-size: 16px;
  font-family: 'Poppins_400Regular';
  color: #6a6180;
  padding-top: 15px;
  padding-right: 10px;
  width: 100%;
`;

export const Label = styled.Text<LabelProps>`
  color: ${(props) => (props.isError ? '#E83F5B' : '#9c98a6')};
  font-family: 'Poppins_400Regular';
  margin-top: -35px;
  margin-left: -20px;
  width: 400px;
`;

export const Icon = styled(Feather)`
  margin-top: 12px;
  margin-right: 15px;
`;

export const HiddenButton = styled.TouchableOpacity``;

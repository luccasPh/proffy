import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  isDisabled: boolean;
}

export const Background = styled.View`
  background: #8257e5;
  height: 40%;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  display: flex;
  justify-content: center;
  margin-left: 22px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #32264d;
  font-family: 'Poppins_600SemiBold';
`;

export const SubTitle = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const SubmitButton = styled(RectButton)<ButtonProps>`
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => (props.isDisabled ? '#DCDCE5' : '#04d361')};
  border-top-width: 1px;
  border-color: #232129;
  padding: 10px ${10 + getBottomSpace()}px;
  margin: 10px 0;
  border-radius: 8px;
  width: 311px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text<ButtonProps>`
  font-size: 18px;
  color: ${(props) => (props.isDisabled ? '#9C98A6' : '#ffffff')};
  font-family: 'Archivo_600SemiBold';
  margin-left: 16px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  margin: 20px;
  background: white;
  border-radius: 20px;
  padding: 35px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 500;
`;

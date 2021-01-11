import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: #8257e5;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Group = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 32px;
  color: white;
  max-width: 185px;
  text-align: center;
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  color: #d4c2ff;
  max-width: 275px;
  text-align: center;
  margin-top: 16px;
`;

export const BackButton = styled(RectButton)`
  left: 0;
  bottom: 0;
  right: 0;
  background: #04d361;
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

export const BackButtonText = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-family: 'Archivo_600SemiBold';
  margin-left: 16px;
`;

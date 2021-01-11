import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Background = styled.View`
  background: #8257e5;
  align-items: center;
  padding-bottom: 30px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const Avatar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 120px;
`;

export const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;

export const AvatarText = styled.Text`
  margin-left: 16px;
  color: #d4c2ff;
  font-family: 'Poppins_400Regular';
`;

export const ExitButton = styled.TouchableOpacity`
  background: #774dd6;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const Content = styled.View`
  margin-left: 30px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 20px;
`;

export const StrongTitle = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_600SemiBold';
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StudyButton = styled(RectButton)`
  background: #8257e5;
  height: 154px;
  width: 144px;
  border-radius: 10px;
  justify-content: space-between;
  padding: 20px;
`;

export const StudyButtonTitle = styled.Text`
  color: #ffffff;
  font-family: 'Archivo_700Bold';
  font-size: 20px;
`;

export const TeachButton = styled(RectButton)`
  background: #04d361;
  height: 154px;
  width: 144px;
  border-radius: 10px;
  margin-right: 25px;
  justify-content: space-between;
  padding: 20px;
`;

export const TeachButtonTitle = styled.Text`
  color: #ffffff;
  font-family: 'Archivo_700Bold';
  font-size: 20px;
`;

export const Subtitle = styled.Text`
  color: #9c98a6;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  margin-top: 12px;
`;

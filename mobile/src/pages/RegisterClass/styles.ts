import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface ButtonProps {
  isDisabled: boolean;
}

export const Container = styled.View`
  align-items: center;
`;

export const Header = styled.View`
  background: #774dd6;
  width: 100%;
  height: 81px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  left: 32px;
`;

export const HeaderTitle = styled.Text`
  color: #d4c2ff;
  font-family: 'Archivo_500Medium';
`;

export const Background = styled.View`
  background: #8257e5;
  height: 244px;
  justify-content: center;
  align-items: center;
`;

export const BackgroundTitle = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 24px;
  color: #fff;
  margin-left: 32px;
  margin-right: 80px;
  margin-bottom: 16px;
`;
export const BackgroundSubtitle = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  color: #fff;
  margin-left: 32px;
  margin-right: 80px;
  margin-bottom: 40px;
`;

export const FormSections = styled.View`
  top: -40px;
`;

export const Avatar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 120px;
`;

export const AvatarImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 100px;
`;

export const AvatarText = styled.Text`
  margin-left: 16px;
  color: #32264d;
  font-family: 'Archivo_700Bold';
  font-size: 21px;
`;

export const Section = styled.View`
  background: #ffffff;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  width: 343px;
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  color: #32264d;
  font-family: 'Archivo_600SemiBold';
  font-size: 20px;
`;

export const AddText = styled.Text`
  color: #8257e5;
  font-family: 'Archivo_600SemiBold';
`;

export const FooterButton = styled.View`
  background: #fafafc;
  border-top-color: #e6e6f0;
  border-top-width: 1px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-left: -20px;
  width: 341px;
  height: 105px;
  justify-content: center;
  align-items: center;
  margin-bottom: -20px;
  margin-top: 40px;
`;

export const SubmitButton = styled(RectButton)<ButtonProps>`
  background-color: ${(props) => (props.isDisabled ? '#DCDCE5' : '#04d361')};
  border-top-width: 1px;
  border-color: #232129;
  padding: 10px ${10 + getBottomSpace()}px;
  border-radius: 8px;
  width: 293px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  color: #ffffff;
  font-family: 'Archivo_600SemiBold';
  font-size: 16px;
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

export const TimesView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

export const RemoveButton = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const RemoveButtonText = styled.Text`
  color: #e33d3d;
  font-size: 14px;
  background: #fff;
  margin-left: 24px;
  margin-right: 24px;
`;

export const Line = styled.View`
  background-color: #e6e6f0;
  height: 1;
  flex: 1;
  align-self: center;
`;

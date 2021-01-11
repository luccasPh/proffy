import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

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
  width: 375px;
  justify-content: center;
  align-items: center;
  padding-bottom: 90px;
`;

export const Group = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackgroundTitle = styled.Text`
  font-family: 'Archivo_700Bold';
  font-size: 24px;
  color: #fff;
  width: 135px;
  margin-right: 60px;
  margin-top: 39px;
`;
export const BackgroundSubtitle = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  color: #fff;
  margin-bottom: 25px;
  margin-top: 39px;
`;

export const Filter = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;
`;

export const FilterText = styled.Text`
  font-family: 'Archivo_400Regular';
  color: #d4c2ff;
  font-size: 16px;
  margin-left: 25px;
  margin-right: 25px;
`;

export const FilterInputs = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const FilterButton = styled(RectButton)<ButtonProps>`
  background: ${(props) => (props.isDisabled ? '#DCDCE5' : '#04d361')};
  width: 310px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: -30px;
`;

export const FavoriteButtonText = styled.Text`
  font-family: 'Archivo_600SemiBold';
  color: #fff;
  font-size: 16px;
`;

export const Content = styled.View`
  top: -60px;
`;

export const ProffyCard = styled.View`
  background: #ffffff;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  width: 343px;
  padding: 20px;
  margin-top: 16px;
`;

export const ProffyAvatar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 120px;
`;

export const ProffyAvatarImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 100px;
`;

export const ProffyAvatarInfo = styled.View`
  margin-left: 16px;
`;

export const ProffyName = styled.Text`
  color: #32264d;
  font-family: 'Archivo_700Bold';
  font-size: 20px;
`;

export const ProffySubject = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
`;

export const ProffyBio = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  margin-top: 24px;
`;

export const Schedules = styled.View``;

export const SchedulesHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 22px;
  margin-right: 40px;
`;

export const SchedulesHeaderText = styled.Text`
  color: #9c98a6;
  font-family: 'Poppins_400Regular';
  font-size: 10px;
`;

export const ScheduleCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  background: #fafafc;
  border: 1px solid #e6e6f0;
  border-radius: 8px;
  width: 294px;
  height: 40px;
  padding: 20px;
`;

export const ScheduleCardText = styled.Text`
  color: #6a6180;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
`;

export const ProffyCardFooter = styled.View`
  background: #fafafc;
  border-top-color: #e6e6f0;
  border-top-width: 1px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-left: -20px;
  width: 341px;
  height: 145px;
  margin-bottom: -20px;
  margin-top: 14px;
  padding-top: 14px;
  padding-left: 14px;
  padding-right: 24px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ProffyCardFooterText = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  margin-right: 24px;
`;

export const ProffyCardFooterPrice = styled.Text`
  color: #8257e5;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  margin-bottom: 24px;
`;

export const FavoriteButton = styled(RectButton)`
  background: #8257e5;
  border-top-width: 1px;
  border-color: #232129;
  padding: 10px;
  border-radius: 8px;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;

export const WhatsappButton = styled(RectButton)`
  background: #04d361;
  border-top-width: 1px;
  border-color: #232129;
  border-radius: 8px;
  width: 220px;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 7px;
`;

export const WhatsappButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_600SemiBold';
  font-size: 16px;
  margin-left: 10px;
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

export const FooterTitle = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  align-self: center;
  top: 30px;
`;

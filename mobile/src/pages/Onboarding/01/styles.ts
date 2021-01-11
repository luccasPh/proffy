import styled from 'styled-components/native';

export const Container = styled.View``;

export const Background = styled.View`
  background: #8257e5;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #6a6180;
  font-family: 'Archivo_500Medium';
  font-size: 40px;
  opacity: 0.16;
`;

export const Subtitle = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_500Medium';
  font-size: 24px;
  max-width: 208px;
  margin-top: 14px;
  margin-bottom: 46px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Page = styled.View`
  width: 4px;
  height: 4px;
`;

export const NextButton = styled.TouchableOpacity`
  margin-left: 200px;
`;

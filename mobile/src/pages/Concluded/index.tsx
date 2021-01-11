import React, { useCallback } from 'react';
import { StatusBar, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import backgroundImg from '../../assets/img/background-2.png';
import doneImg from '../../assets/img/done.png';

import {
  Container,
  Content,
  Group,
  Title,
  SubTitle,
  BackButton,
  BackButtonText,
} from './styles';

interface RouteParams {
  title: string;
  subtitle: string;
  goBack: string;
  buttonText: string;
}

const Concluded: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const { title, subtitle, goBack, buttonText } = params as RouteParams;

  const handleButtonClick = useCallback(() => {
    reset({
      routes: [{ name: goBack }],
      index: 0,
    });
  }, [goBack, reset]);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Content>
        <Image source={backgroundImg} style={{ height: 500 }} />
        <Group>
          <Image source={doneImg} />
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </Group>
      </Content>
      <BackButton onPress={handleButtonClick}>
        <BackButtonText>{buttonText}</BackButtonText>
      </BackButton>
    </Container>
  );
};

export default Concluded;

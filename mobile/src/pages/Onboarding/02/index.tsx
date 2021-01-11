import React, { useCallback } from 'react';
import { Image, StatusBar, View } from 'react-native';

import { useAuth } from '../../../hooks/auth';

import teachImg from '../../../assets/img/teach.png';
import nextIcon from '../../../assets/icons/next.png';

import {
  Container,
  Background,
  Title,
  Subtitle,
  Footer,
  Page,
  NextButton,
} from './styles';

const Onboarding02: React.FC = () => {
  const { doneOnboarding } = useAuth();

  const handleNextPage = useCallback(async () => {
    await doneOnboarding(false);
  }, [doneOnboarding]);

  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <Background>
        <Image source={teachImg} />
      </Background>
      <View style={{ marginTop: 40, marginLeft: 40, marginRight: 40 }}>
        <Title>02.</Title>
        <Subtitle>Ou dê aulas sobre o que você mais conhece</Subtitle>

        <Footer>
          <Page style={{ backgroundColor: '#C1BCCC' }} />
          <Page style={{ backgroundColor: '#8257E5', marginLeft: 10 }} />
          <NextButton onPress={handleNextPage}>
            <Image source={nextIcon} />
          </NextButton>
        </Footer>
      </View>
    </Container>
  );
};

export default Onboarding02;

import React, { useCallback } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import studyImg from '../../../assets/img/study.png';
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

const Onboarding01: React.FC = () => {
  const navigation = useNavigation();

  const handleNextPage = useCallback(() => {
    navigation.navigate('02');
  }, [navigation]);

  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <Background>
        <Image source={studyImg} />
      </Background>
      <View style={{ marginTop: 40, marginLeft: 40, marginRight: 40 }}>
        <Title>01.</Title>
        <Subtitle>Encontre vários professores para ensinar você</Subtitle>

        <Footer>
          <Page style={{ backgroundColor: '#8257E5' }} />
          <Page style={{ backgroundColor: '#C1BCCC', marginLeft: 10 }} />
          <NextButton onPress={handleNextPage}>
            <Image source={nextIcon} />
          </NextButton>
        </Footer>
      </View>
    </Container>
  );
};

export default Onboarding01;

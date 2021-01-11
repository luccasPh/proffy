import React, { useCallback, useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkeletonContent from 'react-native-skeleton-content';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import backgroundImg from '../../assets/img/background-3.png';
import studyIcon from '../../assets/icons/study.png';
import teachIcon from '../../assets/icons/give-classes.png';
import heartIcon from '../../assets/icons/heart.png';

import {
  Container,
  Background,
  Header,
  Avatar,
  AvatarImage,
  AvatarText,
  ExitButton,
  Content,
  Title,
  StrongTitle,
  Buttons,
  StudyButton,
  StudyButtonTitle,
  TeachButton,
  TeachButtonTitle,
  Subtitle,
} from './styles';

const Home: React.FC = () => {
  const { setUser, user, auth, signOut } = useAuth();
  const [connection, setConnection] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    api
      .get('/users', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        signOut();
      });
  }, [auth.token, setUser, signOut]);

  useEffect(() => {
    api.get('/classes/connection').then((response) => {
      setConnection(response.data.total);
    });
  }, []);

  const handleAvatarPress = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const handleStudentPress = useCallback(() => {
    navigation.navigate('StudyTabs');
  }, [navigation]);

  const handleTeachPress = useCallback(() => {
    if (user.whatsapp) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('RegisterClass');
    }
  }, [navigation, user.whatsapp]);
  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <Background>
        <Header>
          <SkeletonContent
            isLoading={!user.id}
            containerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            layout={[
              {
                key: '1',
                width: 40,
                height: 40,
                borderRadius: 100,
              },
              {
                key: '2',
                width: 120,
                height: 30,
                marginLeft: 10,
                marginRight: 100,
              },
              {
                key: '3',
                width: 40,
                height: 40,
                marginLeft: 10,
                borderRadius: 10,
              },
            ]}
          >
            <Avatar onPress={handleAvatarPress}>
              <AvatarImage
                source={{
                  uri: user.avatar,
                }}
              />
              <AvatarText>
                {user.name} {user.last_name}
              </AvatarText>
            </Avatar>

            <ExitButton onPress={signOut}>
              <Icon name="power" size={20} color="#D4C2FF" />
            </ExitButton>
          </SkeletonContent>
        </Header>

        <Image source={backgroundImg} />
      </Background>

      <Content>
        <Title>Seja bem-vindo.</Title>
        <StrongTitle>O que deseja fazer?</StrongTitle>

        <Buttons>
          <SkeletonContent
            isLoading={!user.id}
            containerStyle={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            layout={[
              { key: '4', height: 154, width: 144, marginRight: 20 },
              { key: '5', height: 154, width: 144 },
            ]}
          >
            <StudyButton onPress={handleStudentPress}>
              <Image source={studyIcon} />
              <StudyButtonTitle>Estudar</StudyButtonTitle>
            </StudyButton>

            <TeachButton onPress={handleTeachPress}>
              <Image source={teachIcon} />
              <TeachButtonTitle>Ensinar</TeachButtonTitle>
            </TeachButton>
          </SkeletonContent>
        </Buttons>

        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={!user.id}
          layout={[{ key: '6', height: 35, width: 120, marginTop: 10 }]}
        >
          <Subtitle>
            Total de {connection} conexões{'\n'}já realizadas{'\t'}
            <Image source={heartIcon} />
          </Subtitle>
        </SkeletonContent>
      </Content>
    </Container>
  );
};

export default Home;

/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  View,
  Linking,
  Alert,
  Modal,
} from 'react-native';

import { UserData, useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import backIcon from '../../../assets/icons/back.png';
import proffyIcon from '../../../assets/icons/proffy.png';
import loveIcon from '../../../assets/icons/love.png';
import nextIcon from '../../../assets/icons/next.png';
import whatsappIcon from '../../../assets/icons/whatsapp.png';
import favoriteIcon from '../../../assets/icons/unfavorite.png';
import loadingGif from '../../../assets/img/loading.gif';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Background,
  Group,
  BackgroundTitle,
  BackgroundSubtitle,
  Content,
  ProffyCard,
  ProffyAvatar,
  ProffyAvatarImage,
  ProffyAvatarInfo,
  ProffyName,
  ProffySubject,
  ProffyBio,
  Schedules,
  SchedulesHeader,
  SchedulesHeaderText,
  ScheduleCard,
  ScheduleCardText,
  ProffyCardFooter,
  ProffyCardFooterText,
  ProffyCardFooterPrice,
  FavoriteButton,
  WhatsappButton,
  WhatsappButtonText,
  FooterTitle,
  ModalContainer,
  ModalContent,
} from './styles';

interface ClassData {
  id: string;
  subject: string;
  cost: string;
  user: UserData;
  schedules: {
    id: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
}

const FavoriteClass: React.FC = () => {
  const { reset } = useNavigation();

  const {favoriteClass, setFavoriteClass, user} = useAuth()
  const [modalVisible, setModalVisible] = useState(true);

  const handleAsyncStorage = useCallback(async () => {
    const favoritesStorage = await AsyncStorage.getItem(`@GoBarber:favorites:${user.id}`);
    if (favoritesStorage) {
      setFavoriteClass(JSON.parse(favoritesStorage));
    }else{
      setFavoriteClass([]);
    }
    setModalVisible(false)
  }, [setFavoriteClass, user.id]);

  useEffect(() => {
    handleAsyncStorage();
  }, [handleAsyncStorage]);

  const handleBackButton = useCallback(() => {
    reset({
      routes: [{ name: 'Home' }],
      index: 0,
    });
  }, [reset]);

  const handleWhatsappButton = useCallback(
    async (id: string | undefined, whatsapp: string | undefined) => {
      await api.post('/classes/connection', {
        user_id: id,
      });

      Linking.openURL(`whatsapp://send?phone=+55${whatsapp}`);
    },
    [],
  );

  const handleFavoriteButton = useCallback(async (classItem: ClassData) => {
    const favoritesStorage = await AsyncStorage.getItem(`@GoBarber:favorites:${user.id}`);
    let favoriteArray = [];
    if (favoritesStorage) {
      favoriteArray = JSON.parse(favoritesStorage);
      const temp = favoriteArray.filter((schedule: ClassData) => {
        return schedule.id !== classItem.id;
      });
      favoriteArray = temp;
      setFavoriteClass(favoriteArray);
      await AsyncStorage.setItem(
        `@GoBarber:favorites:${user.id}`,
        JSON.stringify(favoriteArray),
      );
    }
    Alert.alert('Tudo certo', 'Proffy removido da sua lista de favoritos');
  }, [setFavoriteClass, user.id]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <StatusBar backgroundColor="transparent" translucent />
      <Header>
        <BackButton onPress={handleBackButton}>
          <Image source={backIcon} />
        </BackButton>
        <HeaderTitle>Estudar</HeaderTitle>
        <Image
          source={proffyIcon}
          style={{ left: -32, width: 40, height: 14 }}
        />
      </Header>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Background>
            <Group>
              <BackgroundTitle>Meus proffys Favoritos</BackgroundTitle>
              <BackgroundSubtitle>
                <Image source={loveIcon} /> {'  '}{favoriteClass?.length} proffys
              </BackgroundSubtitle>
            </Group>
          </Background>

          {!modalVisible && (
          <Content>
            {favoriteClass &&
              favoriteClass.map((classItem) => (
                <ProffyCard key={classItem.id}>
                  <ProffyAvatar>
                    <ProffyAvatarImage
                      source={{
                        uri: classItem.user.avatar,
                      }}
                    />
                    <ProffyAvatarInfo>
                      <ProffyName>
                        {classItem.user.name} {classItem.user.last_name}
                      </ProffyName>
                      <ProffySubject>{classItem.subject}</ProffySubject>
                    </ProffyAvatarInfo>
                  </ProffyAvatar>
                  <ProffyBio>{classItem.user.bio}</ProffyBio>
                  <View
                    style={{
                      borderBottomColor: '#E6E6F0',
                      borderBottomWidth: 1,
                      marginTop: 24,
                      marginBottom: 24,
                      width: 342,
                      left: -20,
                    }}
                  />

                  <Schedules>
                    <SchedulesHeader>
                      <SchedulesHeaderText>Dia</SchedulesHeaderText>
                      <SchedulesHeaderText>Horário</SchedulesHeaderText>
                    </SchedulesHeader>

                    <ScheduleCard
                      style={classItem.schedules[0].id ? {} : { opacity: 0.5 }}
                    >
                      <ScheduleCardText>Segunda</ScheduleCardText>
                      <Image source={nextIcon} style={{ left: -5 }} />
                      <ScheduleCardText>
                        {classItem.schedules[0].id
                          ? `${classItem.schedules[0].froM}h - ${classItem.schedules[0].to}h`
                          : '-             '}
                      </ScheduleCardText>
                    </ScheduleCard>

                    <ScheduleCard
                      style={classItem.schedules[1].id ? {} : { opacity: 0.5 }}
                    >
                      <ScheduleCardText>Terça</ScheduleCardText>
                      <Image source={nextIcon} style={{ left: 5 }} />
                      <ScheduleCardText>
                        {classItem.schedules[1].id
                          ? `${classItem.schedules[1].froM}h - ${classItem.schedules[1].to}h`
                          : '-             '}
                      </ScheduleCardText>
                    </ScheduleCard>

                    <ScheduleCard
                      style={classItem.schedules[2].id ? {} : { opacity: 0.5 }}
                    >
                      <ScheduleCardText>Quarta</ScheduleCardText>
                      <Image source={nextIcon} />
                      <ScheduleCardText>
                        {classItem.schedules[2].id
                          ? `${classItem.schedules[2].froM}h - ${classItem.schedules[2].to}h`
                          : '-             '}
                      </ScheduleCardText>
                    </ScheduleCard>

                    <ScheduleCard
                      style={classItem.schedules[3].id ? {} : { opacity: 0.5 }}
                    >
                      <ScheduleCardText>Quinta</ScheduleCardText>
                      <Image source={nextIcon} />
                      <ScheduleCardText>
                        {classItem.schedules[3].id
                          ? `${classItem.schedules[3].froM}h - ${classItem.schedules[3].to}h`
                          : '-             '}
                      </ScheduleCardText>
                    </ScheduleCard>

                    <ScheduleCard
                      style={classItem.schedules[4].id ? {} : { opacity: 0.5 }}
                    >
                      <ScheduleCardText>Sexta</ScheduleCardText>
                      <Image source={nextIcon} style={{ left: 5 }} />
                      <ScheduleCardText>
                        {classItem.schedules[4].id
                          ? `${classItem.schedules[4].froM}h - ${classItem.schedules[4].to}h`
                          : '-             '}
                      </ScheduleCardText>
                    </ScheduleCard>
                  </Schedules>

                  <ProffyCardFooter>
                    <ProffyCardFooterText>
                      Preço da minha hora:
                    </ProffyCardFooterText>
                    <ProffyCardFooterPrice>
                      {`R$ ${classItem.cost} reais`}
                    </ProffyCardFooterPrice>

                    <FavoriteButton
                      onPress={() => handleFavoriteButton(classItem)}
                    >
                      <Image source={favoriteIcon} />
                    </FavoriteButton>

                    <WhatsappButton
                      onPress={() =>
                        handleWhatsappButton(
                          classItem.user.id,
                          classItem.user.whatsapp,
                        )}
                    >
                      <Image
                        source={whatsappIcon}
                        style={{ width: 20, height: 20 }}
                      />
                      <WhatsappButtonText>Entrar em contato</WhatsappButtonText>
                    </WhatsappButton>
                  </ProffyCardFooter>
                </ProffyCard>
              ))}
            {favoriteClass && favoriteClass?.length > 0 ? (
              <FooterTitle>Estes são todos os resultados</FooterTitle>
            ):(
              <FooterTitle
                style={{top: 150, width: 200, textAlign: 'center'}}
              >Você não tem proffys favoritos ainda
              </FooterTitle>
            )}
          </Content>
          )}
        
        </Container>
      </ScrollView>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <ModalContainer>
          <ModalContent>
            <Image source={loadingGif} />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default FavoriteClass;

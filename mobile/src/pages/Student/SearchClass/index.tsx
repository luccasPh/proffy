/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Modal,
} from 'react-native';

import { UserData, useAuth } from '../../../hooks/auth';
import api from '../../../services/api';
import PickerSelect from '../../../components/PickerSelect';
import {
  getSubjectItems,
  getWeekDayItems,
  getScheduleItems,
} from '../../../utils/pickerItems';

import backIcon from '../../../assets/icons/back.png';
import proffyIcon from '../../../assets/icons/proffy.png';
import smileIcon from '../../../assets/icons/smile.png';
import nextIcon from '../../../assets/icons/next.png';
import whatsappIcon from '../../../assets/icons/whatsapp.png';
import favoriteIcon from '../../../assets/icons/unselect-favorite.png';
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
  Filter,
  FilterText,
  FilterInputs,
  FilterButton,
  FavoriteButtonText,
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
  ModalContainer,
  ModalContent,
  FooterTitle,
} from './styles';

interface SearchClassProps {
  subject: string;
  week_day: string;
  schedule: string;
}

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

const SearchClass: React.FC = () => {
  const { reset } = useNavigation();
  const formSearchRef = useRef<FormHandles>(null);

  const { setFavoriteClass, user } = useAuth();
  const [totalProffy, setTotalProffy] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [classList, setClassList] = useState<ClassData[]>();
  const [disable, setDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const subjectItems = getSubjectItems();
  const weekDayItems = getWeekDayItems();
  const scheduleItems = getScheduleItems();

  useEffect(() => {
    api.get('/classes/proffys').then((response) => {
      setTotalProffy(response.data.total);
    });
  }, []);

  const handleBackButton = useCallback(() => {
    reset({
      routes: [{ name: 'Home' }],
      index: 0,
    });
  }, [reset]);

  const handleFilterButton = useCallback(() => {
    setShowFilter(!showFilter);
    setDisabled(true);
  }, [showFilter]);

  const handleFilterForm = useCallback((value: string, key: string) => {
    const data = formSearchRef.current?.getData() as SearchClassProps;
    if (key === 'subject') {
      data.subject = value;
    } else if (key === 'week_day') {
      data.week_day = value;
    } else {
      data.schedule = value;
    }
    const isEmpty = Object.values(data).some((x) => x === null);
    setDisabled(isEmpty);
  }, []);

  const handleFormSubmit = useCallback(async (data: SearchClassProps) => {
    try {
      setModalVisible(true);
      const response = await api.get('/classes/list', {
        params: {
          subject: data.subject,
          week_day: data.week_day,
          schedule: data.schedule,
        },
      });
      if (response.data.length === 0) {
        Alert.alert(
          'Sem resultados',
          'Não foram encontrados proffys com sua pesquisa',
        );
      }
      setClassList(response.data);
    } catch (error) {
      const { data } = error.response;
      Alert.alert('Aconteceu um error', data.detail);
    }
    setModalVisible(false);
  }, []);

  const handleWhatsappButton = useCallback(
    async (id: string | undefined, whatsapp: string | undefined) => {
      await api.post('/classes/connection', {
        user_id: id,
      });

      Linking.openURL(`whatsapp://send?phone=+55${whatsapp}`);
    },
    [],
  );

  const handleFavoriteButton = useCallback(
    async (classItem: ClassData) => {
      const favoritesStorage = await AsyncStorage.getItem(
        `@GoBarber:favorites:${user.id}`,
      );
      let favoriteArray = [];
      if (favoritesStorage) {
        favoriteArray = JSON.parse(favoritesStorage);
        const temp = favoriteArray.filter((schedule: ClassData) => {
          return schedule.id !== classItem.id;
        });
        favoriteArray = temp;
        favoriteArray.push(classItem);
        setFavoriteClass(favoriteArray);
        await AsyncStorage.setItem(
          `@GoBarber:favorites:${user.id}`,
          JSON.stringify(favoriteArray),
        );
      } else {
        favoriteArray.push(classItem);
        setFavoriteClass(favoriteArray);
        await AsyncStorage.setItem(
          `@GoBarber:favorites:${user.id}`,
          JSON.stringify(favoriteArray),
        );
      }

      Alert.alert('Tudo certo', 'Proffy adicionado a sua lista de favoritos');
    },
    [setFavoriteClass, user.id],
  );

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
              <BackgroundTitle>Proffys Disponíveis</BackgroundTitle>
              <BackgroundSubtitle>
                <Image source={smileIcon} /> {'  '}
                {totalProffy} proffys
              </BackgroundSubtitle>
            </Group>
            <TouchableOpacity
              onPress={handleFilterButton}
              style={showFilter ? {} : { marginBottom: -10 }}
            >
              <Filter>
                <Icon name="filter" size={20} color="#04D361" />
                <FilterText>Filtrar por dia, hora e matéria</FilterText>
                {showFilter ? (
                  <Icon name="chevron-up" size={20} color="#A380F6" />
                ) : (
                  <Icon name="chevron-down" size={20} color="#A380F6" />
                )}
              </Filter>
              <View
                style={{
                  borderBottomColor: '#9871F5',
                  borderStyle: 'dotted',
                  width: 298,
                  borderBottomWidth: 1,
                  marginTop: 10,
                }}
              />
            </TouchableOpacity>
            {showFilter && (
              <Form ref={formSearchRef} onSubmit={handleFormSubmit}>
                <FilterInputs>
                  <PickerSelect
                    name="subject"
                    label="Materia"
                    placeholder="Selecione"
                    items={subjectItems}
                    onValueChange={(value) =>
                      handleFilterForm(value, 'subject')
                    }
                    containerStyle={{ width: 311, height: 48 }}
                  />
                  <PickerSelect
                    name="week_day"
                    label="Dia da semana"
                    placeholder="Selecione"
                    items={weekDayItems}
                    onValueChange={(value) =>
                      handleFilterForm(value, 'week_day')
                    }
                    containerStyle={{ width: 179, height: 48, marginTop: 80 }}
                  />
                  <PickerSelect
                    name="schedule"
                    label="Horário"
                    placeholder="Selecione"
                    items={scheduleItems}
                    onValueChange={(value) =>
                      handleFilterForm(value, 'schedule')
                    }
                    containerStyle={{ width: 124, height: 48, marginLeft: 10 }}
                  />
                  <FilterButton
                    isDisabled={disable}
                    enabled={!disable}
                    onPress={() => formSearchRef.current?.submitForm()}
                  >
                    <FavoriteButtonText>Procura</FavoriteButtonText>
                  </FilterButton>
                </FilterInputs>
              </Form>
            )}
          </Background>

          <Content>
            {classList &&
              classList.map((classItem) => (
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
                        )
                      }
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
            {classList && (
              <FooterTitle>Estes são todos os resultados</FooterTitle>
            )}
          </Content>
        </Container>

        <Modal animationType="slide" transparent visible={modalVisible}>
          <ModalContainer>
            <ModalContent>
              <Image source={loadingGif} />
            </ModalContent>
          </ModalContainer>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SearchClass;

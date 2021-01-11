/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from 'react-native';

import { useAuth, UserData } from '../../hooks/auth';
import api from '../../services/api';
import Input from '../../components/InputUser';
import InputMask from '../../components/InputMask';
import PickerSelect from '../../components/PickerSelect';
import { getWeekDayItems, getSubjectItems } from '../../utils/pickerItems';
import {
  getValidationErrors,
  setCreateClassValidation,
} from '../../utils/validation';

import backIcon from '../../assets/icons/back.png';
import proffyIcon from '../../assets/icons/proffy.png';
import loadingGif from '../../assets/img/loading.gif';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Background,
  BackgroundTitle,
  BackgroundSubtitle,
  FormSections,
  Avatar,
  AvatarImage,
  AvatarText,
  Section,
  SectionTitle,
  AddText,
  TimesView,
  RemoveButton,
  Line,
  RemoveButtonText,
  FooterButton,
  SubmitButton,
  SubmitButtonText,
  ModalContainer,
  ModalContent,
} from './styles';

interface RegisterData {
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  schedules: {
    week_day: number;
    froM: string;
    to: string;
  }[];
}

interface ClassData {
  subject: string;
  cost: string;
  schedules: {
    week_day: number;
    froM: string;
    to: string;
  }[];
}

const RegisterClass: React.FC = () => {
  const formRegisterRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { setUser, user, auth, signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleItems, setScheduleItem] = useState([
    { id: uuidv4(), week_day: 0, froM: '', to: '' },
  ]);

  const subjectItems = getSubjectItems();
  const weekDayItems = getWeekDayItems();

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

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFormRegisterSubmit = useCallback(
    async (data: RegisterData) => {
      try {
        formRegisterRef.current?.setErrors({});
        const schema = setCreateClassValidation();
        const cost = data.cost.replace(/[R $ ]/g, '');
        const whatsapp = data.whatsapp.replace(/\D/g, '');
        data.whatsapp = whatsapp;
        data.cost = cost;
        if (data.subject === null) {
          data.subject = '';
        }
        data.schedules.forEach((schedule) => {
          if (schedule.week_day === null) {
            schedule.week_day = 0;
          }
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        setModalVisible(true);
        const userData: UserData = {
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          whatsapp: data.whatsapp,
          bio: data.bio,
        };
        const classData: ClassData = {
          subject: data.subject,
          cost: data.cost,
          schedules: data.schedules,
        };
        const response = await api.put('/users', userData, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        await api.post('/classes', classData, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUser(response.data);
        navigation.navigate('Concluded', {
          title: 'Cadastro Salvo!',
          subtitle:
            'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.',
          goBack: 'Home',
          buttonText: 'Voltar',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRegisterRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao tentar atualizar seus dados', data.detail);
        }
      }
      setModalVisible(false);
    },
    [auth.token, navigation, setUser, user.email, user.last_name, user.name],
  );

  const addNewScheduleItem = useCallback(() => {
    if (scheduleItems.length < 10) {
      setScheduleItem([
        { id: uuidv4(), week_day: 0, froM: '', to: '' },
        ...scheduleItems,
      ]);
    } else {
      Alert.alert('Ateção', 'Você atingiu o máximo de horários possível');
    }
  }, [scheduleItems]);

  const removeScheduleItem = useCallback(
    (id: string) => {
      setScheduleItem(scheduleItems.filter((schedule) => schedule.id !== id));
    },
    [scheduleItems],
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
        <HeaderTitle>Dar aula</HeaderTitle>
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
            <BackgroundTitle>
              Que incrível que você quer dar aulas.
            </BackgroundTitle>
            <BackgroundSubtitle>
              O primeiro passo, é preencher esse formulário de inscrição.
            </BackgroundSubtitle>
          </Background>

          <FormSections>
            <Form ref={formRegisterRef} onSubmit={handleFormRegisterSubmit}>
              <Section>
                <SectionTitle>Seus dados</SectionTitle>
                <View
                  style={{
                    borderBottomColor: '#E6E6F0',
                    borderBottomWidth: 1,
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                />
                <Avatar>
                  <AvatarImage
                    source={{
                      uri: user.avatar,
                    }}
                  />
                  <AvatarText>
                    {user.name} {user.last_name}
                  </AvatarText>
                </Avatar>
                <InputMask
                  name="whatsapp"
                  label="Whatsapp"
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  containerStyle={{ marginTop: 42 }}
                />
                <Input
                  name="bio"
                  type="text"
                  label="Bio"
                  style={{
                    textAlignVertical: 'top',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                  containerStyle={{
                    marginTop: 42,
                    height: 280,
                  }}
                />

                <SectionTitle style={{ marginTop: 40 }}>
                  Sobre a aula
                </SectionTitle>
                <View
                  style={{
                    borderBottomColor: '#E6E6F0',
                    borderBottomWidth: 1,
                    marginTop: 10,
                    marginBottom: 50,
                  }}
                />
                <PickerSelect
                  name="subject"
                  label="Materia"
                  placeholder="Selecione qual você quer ensinar"
                  items={subjectItems}
                  onValueChange={(value) => console.log(value)}
                />
                <InputMask
                  name="cost"
                  label="Custo da sua hora por aula"
                  type="money"
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: 'R$ ',
                    suffixUnit: '',
                  }}
                  containerStyle={{ marginTop: 42 }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 40,
                  }}
                >
                  <SectionTitle>Horários disponíveis</SectionTitle>
                  <TouchableOpacity onPress={addNewScheduleItem}>
                    <AddText>+ Novo</AddText>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomColor: '#E6E6F0',
                    borderBottomWidth: 1,
                    marginTop: 10,
                    marginBottom: 50,
                  }}
                />
                {scheduleItems.map((schedule, index) => {
                  return (
                    <View
                      key={
                        schedule.id
                          ? schedule.id
                          : `${index}-${schedule.week_day}`
                      }
                    >
                      <PickerSelect
                        name={`schedules[${index}].week_day`}
                        label="Dia da semana"
                        placeholder="Selecione o dia"
                        items={weekDayItems}
                        onValueChange={(value) => console.log(value)}
                      />
                      <TimesView>
                        <InputMask
                          name={`schedules[${index}].froM`}
                          label="Das"
                          type="datetime"
                          options={{
                            format: 'HH:mm',
                          }}
                          containerStyle={{ width: 139 }}
                        />
                        <InputMask
                          name={`schedules[${index}].to`}
                          label="Até"
                          type="datetime"
                          options={{
                            format: 'HH:mm',
                          }}
                          containerStyle={{ width: 139 }}
                        />
                      </TimesView>
                      {scheduleItems.length !== 1 && (
                        <RemoveButton>
                          <Line />
                          <TouchableOpacity
                            onPress={() => removeScheduleItem(schedule.id)}
                          >
                            <RemoveButtonText>Excluir horário</RemoveButtonText>
                          </TouchableOpacity>
                          <Line />
                        </RemoveButton>
                      )}
                    </View>
                  );
                })}

                <FooterButton
                  style={
                    scheduleItems.length < 2
                      ? { marginTop: 50 }
                      : { marginTop: 0 }
                  }
                >
                  <SubmitButton
                    isDisabled={false}
                    onPress={() => {
                      formRegisterRef.current?.submitForm();
                    }}
                  >
                    <SubmitButtonText>Salvar</SubmitButtonText>
                  </SubmitButton>
                </FooterButton>
              </Section>
            </Form>
          </FormSections>
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

export default RegisterClass;

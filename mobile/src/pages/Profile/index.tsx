/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import SkeletonContent from 'react-native-skeleton-content';
import * as ImagePicker from 'expo-image-picker';
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
import InputPassword from '../../components/InputUser/Password';
import InputMask from '../../components/InputMask';
import PickerSelect from '../../components/PickerSelect';
import { getWeekDayItems, getSubjectItems } from '../../utils/pickerItems';
import {
  getValidationErrors,
  setUpdateProffyValidation,
  setUpdateUserValidation,
  setUpdateClassValidation,
  setPasswordValidation,
} from '../../utils/validation';

import backIcon from '../../assets/icons/back.png';
import proffyIcon from '../../assets/icons/proffy.png';
import backgroundImg from '../../assets/img/background-4.png';
import loadingGif from '../../assets/img/loading.gif';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Background,
  Avatar,
  Loading,
  UserName,
  ClassSubject,
  FormSections,
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

interface ClassData {
  id: string;
  subject: string;
  cost: string;
  schedules: {
    id?: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
  del_schedules?: string[];
}

interface PasswordData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const Profile: React.FC = () => {
  const formUserRef = useRef<FormHandles>(null);
  const formClassRef = useRef<FormHandles>(null);
  const formPasswordRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { setUser, user, auth, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [_class, setClass] = useState<ClassData>({} as ClassData);
  const [isFetch, setIsFetch] = useState(true);
  const [delSchedules, setDelSchedules] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

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

  useEffect(() => {
    api
      .get('/classes', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setClass(response.data);
        setIsFetch(false);
      });
  }, [auth.token]);

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleFormUserSubmit = useCallback(
    async (data: UserData) => {
      try {
        formUserRef.current?.setErrors({});
        let schema;
        if (user.whatsapp) {
          schema = setUpdateProffyValidation();
        } else {
          schema = setUpdateUserValidation();
        }
        if (data.whatsapp) {
          const whatsapp = data.whatsapp.replace(/\D/g, '');
          data.whatsapp = whatsapp;
        }
        await schema.validate(data, {
          abortEarly: false,
        });
        setModalVisible(true);
        const response = await api.put('/users', data, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUser(response.data);
        Alert.alert('Tudo certo', 'Seus dados foram atualizado com sucessor');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formUserRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao tentar atualizar seus dados', data.detail);
        }
      }
      setModalVisible(false);
    },
    [auth, setUser, user],
  );

  const handleFormClassSubmit = useCallback(
    async (data: ClassData) => {
      try {
        formClassRef.current?.setErrors({});
        const schema = setUpdateClassValidation();
        const cost = data.cost.replace(/[R $ ]/g, '');
        data.id = _class.id;
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
        data.del_schedules = delSchedules;
        setModalVisible(true);
        const response = await api.put('/classes', data, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setClass(response.data);
        Alert.alert('Tudo certo', 'Sua aula foi atualizado com sucessor');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formClassRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao tentar atualizar seus dados', data.detail);
        }
      }
      setModalVisible(false);
    },
    [_class.id, auth.token, delSchedules],
  );

  const handleFormPasswordSubmit = useCallback(
    async (data: PasswordData) => {
      try {
        formPasswordRef.current?.setErrors({});
        const schema = setPasswordValidation();
        await schema.validate(data, {
          abortEarly: false,
        });
        setModalVisible(true);
        await api.put('/users/password', data, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        Alert.alert('Tudo certo', 'Sua senha foi alterada com sucesso');
        formPasswordRef.current?.reset();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formPasswordRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao tentar altera sua senha', data.detail);
        }
      }
      setModalVisible(false);
    },
    [auth.token],
  );

  const handleSelectAvatar = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Alerta',
        'Você precisa da permissão de acesso as suas fotos!',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;
    const data = new FormData();
    data.append('avatar', {
      name: 'image.jpg',
      type: 'image/jpg',
      uri,
    } as any);

    setLoading(true);
    try {
      const response = await api.put('/users', data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUser(response.data);
      Alert.alert(
        'Tudo certo!',
        'Sua foto de perfil foi atualizada com sucesso',
      );
    } catch (error) {
      if (error.response.status === 401) {
        signOut();
      } else {
        Alert.alert(
          'Error ao tenta atualizar avatar',
          'Ocorreu um error ao tentar altera sua foto de avatar tente novamente',
        );
      }
    }
    setLoading(false);
  }, [auth, setUser, signOut]);

  const handleSelectOnChangeSubject = useCallback(
    (value: string) => {
      setClass({ ..._class, subject: value });
    },
    [_class],
  );

  const handleSelectOnChangeWeekDay = useCallback(
    (value: number, index: number) => {
      const tempSchedule = _class.schedules;
      tempSchedule[index].week_day = value;
      setClass({
        ..._class,
        schedules: tempSchedule,
      });
    },
    [_class],
  );

  const handleOnChange = useCallback(() => {
    const data = formPasswordRef.current?.getData() as PasswordData;
    const isEmpty = Object.values(data).some(
      (value: string) => value.length < 2,
    );
    setIsDisabled(isEmpty);
  }, []);

  const addNewScheduleItem = useCallback(() => {
    if (_class.schedules.length < 10) {
      if (formClassRef.current?.getData()) {
        const newSchedule = { week_day: 0, froM: '', to: '' };
        setClass({
          ..._class,
          schedules: [newSchedule, ..._class.schedules],
        });
      }
    } else {
      Alert.alert('Ateção', 'Você atingiu o máximo de horários possível');
    }
  }, [_class]);

  const removeScheduleItem = useCallback(
    (id: string | undefined, scheduleIndex: number) => {
      if (id) {
        setDelSchedules([...delSchedules, id]);
      }
      if (formClassRef.current?.getData()) {
        const data = formClassRef.current.getData() as ClassData;
        const removedSchedule = data.schedules.filter(
          (_, index) => scheduleIndex !== index,
        );
        setClass({
          ..._class,
          schedules: removedSchedule,
        });
      }
    },
    [delSchedules, _class],
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
        <HeaderTitle>Meu perfil</HeaderTitle>
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
            <Image source={backgroundImg} />
            <View style={{ position: 'absolute', alignItems: 'center' }}>
              <SkeletonContent
                isLoading={!user.id || isFetch}
                containerStyle={{ flex: 1, alignItems: 'center' }}
                layout={[
                  { key: '1', width: 140, height: 140, borderRadius: 100 },
                  { key: '2', width: 216, height: 55, marginTop: 14 },
                ]}
              >
                <TouchableOpacity onPress={handleSelectAvatar}>
                  {loading ? (
                    <Loading>
                      <Image source={loadingGif} />
                    </Loading>
                  ) : (
                    <Avatar source={{ uri: user.avatar }} />
                  )}
                </TouchableOpacity>

                <UserName>
                  {user.name} {user.last_name}
                </UserName>
                {_class.id && <ClassSubject>{_class.subject}</ClassSubject>}
              </SkeletonContent>
            </View>
          </Background>

          <FormSections>
            <SkeletonContent
              isLoading={!user.id || isFetch}
              containerStyle={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 8,
                width: 343,
                height: '100%',
              }}
              layout={[
                {
                  key: '3',
                  width: 295,
                  height: 82,
                  marginTop: 20,
                  marginLeft: 24,
                },
                {
                  key: '4',
                  width: 295,
                  height: 82,
                  marginTop: 20,
                  marginLeft: 24,
                },
                {
                  key: '5',
                  width: 295,
                  height: 82,
                  marginTop: 20,
                  marginLeft: 24,
                },
              ]}
            >
              <Section>
                <Form
                  ref={formUserRef}
                  onSubmit={handleFormUserSubmit}
                  initialData={user}
                >
                  <SectionTitle>Seus dados</SectionTitle>
                  <View
                    style={{
                      borderBottomColor: '#E6E6F0',
                      borderBottomWidth: 1,
                      marginTop: 10,
                      marginBottom: 50,
                    }}
                  />
                  <Input name="name" type="text" label="Nome" />
                  <Input
                    name="last_name"
                    type="text"
                    label="Sobrenome"
                    containerStyle={{ marginTop: 42 }}
                  />
                  <Input
                    autoCapitalize="none"
                    keyboardType="email-address"
                    name="email"
                    type="text"
                    label="E-mail"
                    containerStyle={{ marginTop: 42 }}
                  />
                  {user.bio && user.whatsapp && (
                    <>
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
                    </>
                  )}

                  <FooterButton>
                    <SubmitButton
                      isDisabled={false}
                      onPress={() => {
                        formUserRef.current?.submitForm();
                      }}
                    >
                      <SubmitButtonText>Salvar</SubmitButtonText>
                    </SubmitButton>
                  </FooterButton>
                </Form>
              </Section>

              {_class.id && (
                <Section style={{ marginTop: 50 }}>
                  <Form
                    ref={formClassRef}
                    onSubmit={handleFormClassSubmit}
                    initialData={_class}
                  >
                    <SectionTitle>Sobre a aula</SectionTitle>
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
                      value={_class.subject}
                      onValueChange={(value) =>
                        handleSelectOnChangeSubject(value)
                      }
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
                    {_class.schedules &&
                      _class.schedules.map((schedule, index) => {
                        return (
                          <View
                            key={
                              schedule.id
                                ? schedule.id
                                : `${index}-${schedule.week_day}`
                            }
                          >
                            {schedule.id && (
                              <Input
                                type="text"
                                name={`schedules[${index}].id`}
                                defaultValue={schedule.id}
                                containerStyle={{ display: 'none' }}
                              />
                            )}

                            <PickerSelect
                              name={`schedules[${index}].week_day`}
                              label="Dia da semana"
                              placeholder="Selecione o dia"
                              items={weekDayItems}
                              value={schedule.week_day}
                              onValueChange={(value) =>
                                handleSelectOnChangeWeekDay(value, index)
                              }
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
                            {_class.schedules.length !== 1 && (
                              <RemoveButton>
                                <Line />
                                <TouchableOpacity
                                  onPress={() =>
                                    removeScheduleItem(schedule.id, index)
                                  }
                                >
                                  <RemoveButtonText>
                                    Excluir horário
                                  </RemoveButtonText>
                                </TouchableOpacity>
                                <Line />
                              </RemoveButton>
                            )}
                          </View>
                        );
                      })}

                    <FooterButton
                      style={
                        _class.schedules.length < 2
                          ? { marginTop: 50 }
                          : { marginTop: 0 }
                      }
                    >
                      <SubmitButton
                        isDisabled={false}
                        onPress={() => {
                          formClassRef.current?.submitForm();
                        }}
                      >
                        <SubmitButtonText>Salvar</SubmitButtonText>
                      </SubmitButton>
                    </FooterButton>
                  </Form>
                </Section>
              )}

              <Section style={{ marginTop: 50 }}>
                <Form
                  ref={formPasswordRef}
                  onSubmit={handleFormPasswordSubmit}
                  initialData={user}
                >
                  <SectionTitle>Senha</SectionTitle>
                  <View
                    style={{
                      borderBottomColor: '#E6E6F0',
                      borderBottomWidth: 1,
                      marginTop: 10,
                      marginBottom: 50,
                    }}
                  />
                  <InputPassword
                    name="old_password"
                    type="password"
                    security
                    label="Senha atual"
                    onChange={handleOnChange}
                  />
                  <InputPassword
                    name="new_password"
                    type="password"
                    security
                    label="Nova senha"
                    onChange={handleOnChange}
                    containerStyle={{ marginTop: 42 }}
                  />
                  <InputPassword
                    name="confirm_password"
                    type="password"
                    security
                    label="Confirma senha"
                    onChange={handleOnChange}
                    containerStyle={{ marginTop: 42 }}
                  />

                  <FooterButton>
                    <SubmitButton
                      isDisabled={isDisabled}
                      enabled={!isDisabled}
                      onPress={() => {
                        formPasswordRef.current?.submitForm();
                      }}
                    >
                      <SubmitButtonText>Altera</SubmitButtonText>
                    </SubmitButton>
                  </FooterButton>
                </Form>
              </Section>
            </SkeletonContent>
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

export default Profile;

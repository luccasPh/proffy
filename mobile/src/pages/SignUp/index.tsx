import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';

import {
  getValidationErrors,
  setValidationSignUp,
} from '../../utils/validation';
import Input from '../../components/InputAuth';
import api from '../../services/api';

import loadingGif from '../../assets/img/loading.gif';
import backIcon from '../../assets/icons/back.png';

import {
  Container,
  BackButton,
  Title,
  SubTitle,
  SubmitButton,
  SubmitButtonText,
  ModalContent,
  ModalContainer,
} from './styles';

interface SignUpFormProps {
  name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpFormProps) => {
      if (disabled) {
        return;
      }
      try {
        formRef.current?.setErrors({});
        const schema = setValidationSignUp();
        await schema.validate(data, {
          abortEarly: false,
        });
        setModalVisible(true);
        await api.post('/session/signup', data);
        navigation.navigate('Concluded', {
          title: 'Cadastro concluído!',
          subtitle:
            'Boa, agora é só checar o e-mail que foi enviado para você confirma seu cadastro e aproveitar os estudos.',
          goBack: 'SignIn',
          buttonText: 'Voltar ao login',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao Registrar', data.detail);
        }
      }
      setModalVisible(false);
    },
    [disabled, navigation],
  );

  const handleOnChange = useCallback(() => {
    const data = formRef.current?.getData();
    if (data) {
      const isEmpty = Object.values(data).some(
        (value: string) => value.length < 2,
      );
      setDisabled(isEmpty);
    }
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Image source={backIcon} />
            </BackButton>

            <View>
              <Title>Crie sua{'\n'}conta gratuíta</Title>
              <SubTitle>
                Basta preencher esses dados{'\n'}e você estará conosco.
              </SubTitle>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                containerStyle={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
                placeholder="Nome"
                name="name"
                type="text"
                onChange={handleOnChange}
                returnKeyType="next"
                onSubmitEditing={() => {
                  lastNameInputRef.current?.focus();
                }}
              />
              <Input
                ref={lastNameInputRef}
                placeholder="Sobrenome"
                name="last_name"
                type="text"
                onChange={handleOnChange}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                placeholder="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                type="text"
                onChange={handleOnChange}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                placeholder="Senha"
                autoCorrect={false}
                autoCapitalize="none"
                name="password"
                type="password"
                onChange={handleOnChange}
                security
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                containerStyle={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
                placeholder="Confirma senha"
                autoCorrect={false}
                autoCapitalize="none"
                name="confirm_password"
                type="password"
                onChange={handleOnChange}
                security
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <SubmitButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
              isDisabled={disabled}
              enabled={!disabled}
            >
              <SubmitButtonText isDisabled={disabled}>
                Cadastrar
              </SubmitButtonText>
            </SubmitButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <ModalContainer>
          <ModalContent>
            <Image source={loadingGif} />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default SignIn;

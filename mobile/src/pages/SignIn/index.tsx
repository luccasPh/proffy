import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Feather as Icon } from '@expo/vector-icons';
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

import { getValidationErrors } from '../../utils/validation';
import Input from '../../components/InputAuth';
import { useAuth } from '../../hooks/auth';

import backgroundImg from '../../assets/img/background-1.png';
import loadingGif from '../../assets/img/loading.gif';

import {
  Background,
  Container,
  Title,
  SubmitButton,
  SubmitButtonText,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
  ModalContent,
  ModalContainer,
} from './styles';

interface SignInFormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [disabled, setDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormProps) => {
      if (disabled) {
        return;
      }
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um email valido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        setModalVisible(true);
        const { email, password } = data;
        await signIn({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao tenta fazer login', data.detail);
        }
        setModalVisible(false);
      }
    },
    [disabled, signIn],
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

  const handleNavigation = useCallback(
    (page: string) => {
      navigation.navigate(page);
    },
    [navigation],
  );

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Background>
            <Image source={backgroundImg} />
          </Background>

          <Container>
            <View>
              <Title>Fazer login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                containerStyle={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
                placeholder="E-mail"
                autoCorrect={false}
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
                containerStyle={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
                ref={passwordInputRef}
                placeholder="Senha"
                autoCapitalize="none"
                name="password"
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
              <SubmitButtonText isDisabled={disabled}>Entrar</SubmitButtonText>
            </SubmitButton>

            <ForgotPassword onPress={() => handleNavigation('Forgot')}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>

            <CreateAccountButton onPress={() => handleNavigation('SignUp')}>
              <Icon name="log-in" size={20} color="#8257E5" />
              <CreateAccountText>Criar uma conta</CreateAccountText>
            </CreateAccountButton>
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

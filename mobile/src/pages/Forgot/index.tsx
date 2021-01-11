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
  Alert,
  Modal,
} from 'react-native';

import { getValidationErrors } from '../../utils/validation';
import Input from '../../components/InputAuth';
import api from '../../services/api';

import backIcon from '../../assets/icons/back.png';
import loadingGif from '../../assets/img/loading.gif';
import backgroundImg from '../../assets/img/background-1.png';

import {
  Background,
  Container,
  Title,
  SubmitButton,
  SubmitButtonText,
  BackButton,
  SubTitle,
  ModalContent,
  ModalContainer,
} from './styles';

interface ForgotFormProps {
  email: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = useCallback(
    async (data: ForgotFormProps) => {
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
        await api.post('/session/forgot', data);
        navigation.navigate('Concluded', {
          title: 'Redefinição enviada!',
          subtitle:
            'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
          goBack: 'SignIn',
          buttonText: 'Voltar ao login',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          const { data } = error.response;
          Alert.alert('Error ao tenta Recupera senha', data.detail);
        }
        setModalVisible(false);
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
            <BackButton onPress={handleGoBack}>
              <Image source={backIcon} />
            </BackButton>

            <View>
              <Title>Esqueceu sua senha?</Title>
              <SubTitle>Não esquenta,{'\n'}vamos dar um jeito nisso.</SubTitle>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                containerStyle={{
                  borderRadius: 8,
                }}
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                type="text"
                onChange={handleOnChange}
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

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import {
  Container,
  Content,
  Footer,
  AnimationContainer,
  Background,
} from './styles';

interface SignInData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signIn } = useAuth();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      setIsDisabled(true);
      try {
        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um email valido!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            addToast({
              type: 'info',
              title: 'Ateção',
              description: err.message,
            });
          });
        } else {
          const { data } = error.response;

          addToast({
            type: 'error',
            title: 'Aviso',
            description: data.detail,
          });
        }
      }
      setIsDisabled(false);
    },
    [addToast, signIn],
  );

  const handleButton = useCallback(() => {
    const data = formRef.current?.getData();
    if (data) {
      const isEmpty = Object.values(data).some((x) => x === '');
      setIsDisabled(isEmpty);
    }
  }, []);

  useEffect(() => {
    if (history.location.state) {
      addToast({
        type: 'info',
        title: 'Ateção',
        description: 'Faça login para continuar',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Fazer login</h1>
            <Input
              name="email"
              type="text"
              label="E-mail"
              position="top"
              onChange={handleButton}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              position="bottom"
              onChange={handleButton}
            />
            <Button disabled={isDisabled} type="submit">
              Entrar
            </Button>

            <Link to="forgot">Esqueci minha senha</Link>
          </Form>

          <Footer>
            <h3>
              Não tem conta? <br />
              <Link to="signup">Cadastre-se</Link>
            </h3>
            <span>
              É de graça
              <img
                src={purpleHeartIcon}
                alt="Coração roxo"
                style={{ marginTop: '4px', marginLeft: '10px' }}
              />
            </span>
          </Footer>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;

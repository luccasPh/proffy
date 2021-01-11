import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

import backIcon from '../../assets/images/icons/back.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface RecoveryData {
  new_password: string;
  confirm_password: string;
}

const Reset: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = useCallback(
    async (data: RecoveryData) => {
      setIsDisabled(true);
      try {
        const schema = Yup.object().shape({
          new_password: Yup.string().min(
            8,
            'A nova senha deve conter no mínimo 8 caracteres!',
          ),
          confirm_password: Yup.string().min(
            8,
            'A confirmação de senha deve conter no mínimo 8 caracteres!',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');
        const { new_password, confirm_password } = data;
        if (!token) {
          addToast({
            type: 'error',
            title: 'Aviso',
            description: 'Token não encontrado ',
          });
          return;
        }

        await api.put('/session/reset', {
          token,
          new_password,
          confirm_password,
        });

        history.push({
          pathname: '/concluded',
          state: {
            title: 'Senha recuperada',
            description:
              'Agora você pode voltar ao login e acessa a sua conta novamente.',
            to: '/signin',
            text: 'Fazer login',
          },
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
    [addToast, history, location],
  );

  const handleButton = useCallback(() => {
    const data = formRef.current?.getData();
    if (data) {
      const isEmpty = Object.values(data).some((x) => x === '');
      setIsDisabled(isEmpty);
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/signin">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperação de senha</h1>
            <h3>Preencha os campos abaixo com sua nova senha.</h3>
            <Input
              name="new_password"
              type="password"
              label="Nova Senha"
              position="top"
              onChange={handleButton}
            />
            <Input
              name="confirm_password"
              type="password"
              label="Confirma senha"
              position="bottom"
              onChange={handleButton}
            />

            <Button disabled={isDisabled} type="submit">
              Altera senha
            </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default Reset;

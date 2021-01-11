import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

import backIcon from '../../assets/images/icons/back.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface RecoveryData {
  email: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = useCallback(
    async (data: RecoveryData) => {
      setIsDisabled(true);
      try {
        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um email valido!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/session/forgot', data);

        history.push({
          pathname: '/concluded',
          state: {
            title: 'Redefinição enviada',
            description:
              'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha.',
            to: '/signin',
            text: 'Voltar',
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
    [addToast, history],
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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Link to="/signin">
              <img src={backIcon} alt="Voltar" />
            </Link>
            <h1>Eita, esqueceu sua senha?</h1>
            <p>Não esquenta, vamos dar um jeito nisso.</p>
            <Input
              name="email"
              type="text"
              label="E-mail"
              position="single"
              onChange={handleButton}
            />

            <Button disabled={isDisabled} type="submit">
              Enviar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignUp;

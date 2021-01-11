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

interface SignUpData {
  name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      setIsDisabled(true);
      try {
        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um email valido!'),
          password: Yup.string().min(
            8,
            'A senha deve conter no mínimo 8 caracteres!',
          ),
          confirm_password: Yup.string().min(
            8,
            'A confirmação de senha deve conter no mínimo 8 caracteres!',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/session/signup', data);
        history.push({
          pathname: '/concluded',
          state: {
            title: 'Cadastro concluído',
            description:
              'Muito bem agora tudo que você precisa fazer e clicar no link que acabamos de enviar para seu email.',
            to: '/signin',
            text: 'Voltar',
          },
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          error.inner.forEach((err) => {
            addToast({
              type: 'info',
              title: 'Atenção',
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

  const handleOnChange = useCallback(() => {
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
            <h1>Cadastro</h1>
            <p>Preencha os dados abaixo para começar.</p>
            <Input
              name="name"
              type="text"
              label="Nome"
              position="top"
              onChange={handleOnChange}
            />
            <Input
              name="last_name"
              type="text"
              label="Sobrenome"
              position="fixed"
              onChange={handleOnChange}
            />
            <Input
              name="email"
              type="text"
              label="E-mail"
              position="fixed"
              onChange={handleOnChange}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              position="fixed"
              onChange={handleOnChange}
            />
            <Input
              name="confirm_password"
              type="password"
              label="Confirma senha"
              position="bottom"
              onChange={handleOnChange}
            />

            <Button disabled={isDisabled} type="submit">
              Cadastrar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignUp;

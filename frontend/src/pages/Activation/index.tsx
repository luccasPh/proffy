import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

const Activation: React.FC = () => {
  const { search } = useLocation();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(search);
    const value = query.get('token');

    api
      .post('/session/activation', { token: value })
      .then(() => {
        history.push({
          pathname: '/concluded',
          state: {
            title: 'Conta ativada',
            description:
              'Sua conta foi ativada voce já pode fazer login no Proffy. :D',
            to: '/signin',
            text: 'Fazer login',
          },
        });
      })
      .catch((error) => {
        const { data } = error.response;
        history.push('/');
        addToast({
          type: 'error',
          title: 'Aviso',
          description: data.detail,
        });
      });
  }, [addToast, history, search]);

  return <div />;
};

export default Activation;

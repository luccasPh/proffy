import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessageProps } from '../../hooks/toast';
import ToastContent from './ToastContent';

import { Container } from './styles';

interface ToastProps {
  messages: ToastMessageProps[];
}

const Toast: React.FC<ToastProps> = ({ messages }) => {
  const msgWithTransitions = useTransition(
    messages,
    (messages) => messages.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {msgWithTransitions.map(({ item, key, props }) => (
        <ToastContent key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default Toast;

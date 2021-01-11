import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';

import { ToastMessageProps, useToast } from '../../../hooks/toast';

import { Content } from './styles';

interface ToastProps {
  message: ToastMessageProps;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const ToastContent: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Content style={style} type={message.type}>
      {icons[message.type]}
      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} style={{ cursor: 'pointer' }} />
      </button>
    </Content>
  );
};

export default ToastContent;

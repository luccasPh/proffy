import React, { createContext, useCallback, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Toast from '../components/Toast';

export interface ToastMessageProps {
  id: string;
  type: 'error' | 'info' | 'success';
  title: string;
  description: string;
}

interface ToastContextProps {
  addToast(message: Omit<ToastMessageProps, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageProps[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessageProps, 'id'>) => {
      const id = uuidv4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((oldMessages) => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

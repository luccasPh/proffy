import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  last_name: string;
  whatsapp?: string;
  bio?: string;
  avatar?: string;
}

interface AuthStateData {
  token: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextProps {
  auth: AuthStateData;
  user: UserData;
  signIn(credentials: SignInData): Promise<void>;
  updateUser(data?: UserData, fileData?: FormData): Promise<void>;
  signOut(): void;
  setUser(value: React.SetStateAction<UserData>): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('@Proffy:token');

    if (token) {
      return { token };
    }

    return {} as AuthStateData;
  });
  const [user, setUser] = useState<UserData>({} as UserData);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/session/signin', {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('@Proffy:token', token);
    setAuth({ token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Proffy:token');

    history.push('/signin');
    setAuth({} as AuthStateData);
    setUser({} as UserData);
  }, [history]);

  const updateUser = useCallback(
    async (data, fileData) => {
      let response;
      if (data) {
        response = await api.put('/users', data, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
      } else {
        response = await api.put('/users', fileData, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
      }
      setUser(response.data);
    },
    [auth],
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        signIn,
        signOut,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

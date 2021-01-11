import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  token: string | null;
  firstTime: string | null;
}

interface SignInData {
  email: string;
  password: string;
}

interface ClassData {
  id: string;
  subject: string;
  cost: string;
  user: UserData;
  schedules: {
    id: string;
    week_day: number;
    froM: string;
    to: string;
  }[];
}

interface AuthContextProps {
  auth: AuthStateData;
  user: UserData;
  loading: boolean;
  favoriteClass: ClassData[] | undefined;
  doneOnboarding(value: boolean): Promise<void>;
  signIn(credentials: SignInData): Promise<void>;
  signOut(): void;
  setUser(value: React.SetStateAction<UserData>): void;
  setFavoriteClass(value: ClassData[]): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthStateData>({} as AuthStateData);
  const [user, setUser] = useState<UserData>({} as UserData);
  const [loading, setLoading] = useState(true);
  const [favoriteClass, setFavoriteClass] = useState<ClassData[]>();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, firstTime] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@Gobarber:firstTime',
      ]);
      if (token[1]) {
        setAuth({ token: token[1], firstTime: firstTime[1] });
      } else {
        setAuth({ token: null, firstTime: firstTime[1] });
      }
      setLoading(false);
    }

    loadStorageData();
  }, [auth.token]);

  const signIn = useCallback(
    async ({ email, password }: SignInData) => {
      const response = await api.post('/session/signin', {
        email,
        password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem('@GoBarber:token', token);

      setAuth({ ...auth, token });
    },
    [auth],
  );

  const doneOnboarding = useCallback(async () => {
    await AsyncStorage.setItem('@Gobarber:firstTime', 'done');
    setAuth({ token: null, firstTime: 'done' });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@GoBarber:token');
    setAuth({ ...auth, token: null });
    setUser({} as UserData);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        loading,
        favoriteClass,
        doneOnboarding,
        signIn,
        signOut,
        setUser,
        setFavoriteClass,
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

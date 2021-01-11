import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_700Bold,
  Archivo_600SemiBold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import Routes from './src/routes';
import AppProvider from './src/hooks';
import api from './src/services/api';

const App: React.FC = () => {
  const [apiIsReady, setApiIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const callApi = useCallback(async () => {
    try {
      await api.get('/classes/connection');
    } finally {
      setApiIsReady(true);
      await SplashScreen.hideAsync();
    }
  }, []);

  const splashScreen = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    splashScreen();
    callApi();
  }, [callApi, splashScreen]);

  if (!fontsLoaded && !apiIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#F0F0F7' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;

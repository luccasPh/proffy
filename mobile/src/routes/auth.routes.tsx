import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '../pages/Forgot';
import Concluded from '../pages/Concluded';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F0F0F7' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Forgot" component={Forgot} />
    <Auth.Screen name="Concluded" component={Concluded} />
  </Auth.Navigator>
);

export default AuthRoutes;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding01 from '../pages/Onboarding/01';
import Onboarding02 from '../pages/Onboarding/02';

const First = createStackNavigator();

const FirstRoutes: React.FC = () => (
  <First.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F0F0F7' },
    }}
  >
    <First.Screen name="01" component={Onboarding01} />
    <First.Screen name="02" component={Onboarding02} />
  </First.Navigator>
);

export default FirstRoutes;

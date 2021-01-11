import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import RegisterClass from '../pages/RegisterClass';
import StudyTabs from './study.routes';
import Concluded from '../pages/Concluded';

const User = createStackNavigator();

const UserRoutes: React.FC = () => (
  <User.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F0F0F7' },
    }}
  >
    <User.Screen name="Home" component={Home} />
    <User.Screen name="Profile" component={Profile} />
    <User.Screen name="RegisterClass" component={RegisterClass} />
    <User.Screen name="StudyTabs" component={StudyTabs} />
    <User.Screen name="Concluded" component={Concluded} />
  </User.Navigator>
);

export default UserRoutes;

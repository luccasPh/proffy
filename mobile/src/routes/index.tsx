/* eslint-disable no-nested-ternary */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../hooks/auth';

import FirstRoutes from './first.routes';
import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';

const Routes: React.FC = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8257e5" />
      </View>
    );
  }

  return auth.firstTime ? (
    auth.token ? (
      <UserRoutes />
    ) : (
      <AuthRoutes />
    )
  ) : (
    <FirstRoutes />
  );
};

export default Routes;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { View } from 'react-native';
import SearchClass from '../pages/Student/SearchClass';
import FavoriteClass from '../pages/Student/FavoriteClass';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 74,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="SearchClass"
        component={SearchClass}
        options={{
          tabBarLabel: 'Proffy',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <>
                {focused && (
                  <View
                    style={{
                      borderBottomColor: '#9871F5',
                      borderStyle: 'dotted',
                      borderBottomWidth: 3,
                      position: 'absolute',
                      left: -61,
                      top: -27,
                      width: 190,
                    }}
                  />
                )}
                <Ionicons
                  name="ios-easel"
                  size={size}
                  color={focused ? '#8257e5' : color}
                />
              </>
            );
          },
        }}
      />
      <Screen
        name="FavoriteClass"
        component={FavoriteClass}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <>
                {focused && (
                  <View
                    style={{
                      borderBottomColor: '#9871F5',
                      borderStyle: 'dotted',
                      borderBottomWidth: 3,
                      position: 'absolute',
                      right: -121,
                      top: -27,
                      width: 187,
                    }}
                  />
                )}
                <Ionicons
                  name="ios-heart"
                  size={size}
                  color={focused ? '#8257e5' : color}
                />
              </>
            );
          },
        }}
      />
    </Navigator>
  );
};

export default StudyTabs;

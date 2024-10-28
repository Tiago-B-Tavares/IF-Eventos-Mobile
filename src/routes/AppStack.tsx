import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScrean from '../screens/SigninScrean';
import ProfileScreen from '../screens/ProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createStackNavigator();


// interface App

export interface AppParamList {
  Home: undefined;
  Settings: undefined;
}


export function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SigninScrean} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
   
    </Stack.Navigator>
  );
}
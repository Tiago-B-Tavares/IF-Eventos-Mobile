
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SigninScrean from '../screens/SigninScrean';


const Stack = createStackNavigator();

export function AuthStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SigninScrean} />
    </Stack.Navigator>
  );
}

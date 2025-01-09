// app/tabs/_layout.tsx
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Tabs } from 'expo-router';
import React from 'react';
import SignInScreen from '../(authScreen)/sign-in';
import { Ionicons } from '@expo/vector-icons';
import '../../styles/global.css';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <>
      <SignedIn>
        <Tabs screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#65d66a',
          tabBarInactiveTintColor: '#65d66a',
          tabBarItemStyle: {
            borderRadius: 25,
            backgroundColor: '#020202',
          },
          tabBarStyle: {
            borderTopWidth: 0,
            position: 'absolute',
            backgroundColor: '#020202', //#166534
            borderTopEndRadius: 25,
            borderTopStartRadius: 25,
            height: 60,
          

          },
        }}>
          <Tabs.Screen name="index" options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View className='flex flex-col justify-center items-center ' style={{ width: 100, height: 60, paddingTop: 20 }}>
                <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                <Text className=' text-sm text-[#65d66a]'>
                  Início
                </Text>
              </View>

            )
          }} />
          <Tabs.Screen name="inscriptions" options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View className='flex flex-col justify-center items-center ' style={{ width: 100, height: 60, paddingTop: 20 }}>
                <Ionicons name={focused ? "clipboard" : "clipboard-outline"} size={size} color={color} />
                <Text className=' text-sm text-[#65d66a]'>
                  inscrições
                </Text>
              </View>
            ),
          }} />
          <Tabs.Screen name="profile" options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <View className='flex flex-col justify-center items-center' style={{ width: 100, height: 60, paddingTop: 20 }}>
                <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
                <Text className=' text-sm text-[#65d66a]'>
                  Perfil
                </Text>
              </View>
            ),
          }} />
        </Tabs>
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </>
  );
}
// app/tabs/_layout.tsx
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Tabs } from 'expo-router';
import React from 'react';
import SignInScreen from '../(authScreen)/sign-in';
import { Ionicons } from '@expo/vector-icons';
import '../../styles/global.css';
import { Image, View, Text } from 'react-native';


import Constants from 'expo-constants';


const statusBarHeight = Constants.statusBarHeight;

export default function TabLayout() {
  return (
    <>
      <SignedIn>
        <Tabs screenOptions={{

          tabBarShowLabel: false,
          tabBarActiveTintColor: '#65d66a',
          tabBarInactiveTintColor: '#8b8b8bcb',
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
        tabBarIcon: ({color, size, focused}) => {
              if (focused) {
                return (
        <View className='flex flex-col justify-center items-center'>
          <Ionicons name="home" size={size} color={color} />
          <Text className='text-sm text-[#65d66a]'>
            Início
          </Text>
        </View>
        )
              }
        return (
        <View className='flex flex-col justify-center items-center'>
          <Ionicons name="home-outline" size={size} color={color} />
          <Text className='text-sm text-[#8b8b8bcb]'>
            Início
          </Text>
        </View>
        )
            },
          }} />


        <Tabs.Screen name="inscriptions" options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className='flex flex-col justify-center items-center'>
                  <Ionicons name="clipboard" size={size} color={color} />
                  <Text className='text-sm text-[#65d66a]'>
                    Inscrições
                  </Text>
                </View>
              )
            }
            return (
              <View className='flex flex-col justify-center items-center'>
                <Ionicons name="clipboard-outline" size={size} color={color} />
                <Text className='text-sm text-[#8b8b8bcb]'>
                  Inscrições
                </Text>
              </View>
            )
          }


        }} />


        <Tabs.Screen name="profile" options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <View className='flex flex-col justify-center items-center'>
                  <Ionicons name="person" size={size} color={color} />
                  <Text className='text-sm text-[#65d66a]'>
                    Perfil
                  </Text>
                </View>
              )
            }
            return (
              <View className='flex flex-col justify-center items-center'>
                <Ionicons name="person-outline" size={size} color={color} />
                <Text className='text-sm text-[#8b8b8bcb]'>
                  Perfil
                </Text>
              </View>
            )
          }
        }} />
      </Tabs>
    </SignedIn >
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </>
  );
}

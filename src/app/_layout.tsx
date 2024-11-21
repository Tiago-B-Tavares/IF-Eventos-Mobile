import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot, Stack } from 'expo-router'
import React from 'react'
import "../styles/global.css";
import { NativeBaseProvider } from 'native-base';
import { Image, View, Text } from 'react-native';

export default function RootLayout() {
  

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <NativeBaseProvider>
          <Stack screenOptions={{
            headerShown: true, 
            headerTitle: () => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../assets/images/logo003.png')}
                  alt="logo"
                  resizeMode="contain"
                  style={{ width: 200, height: 50, borderWidth: 1 }} // Ajuste o tamanho conforme necessário
                />
              </View>
            ),
          }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </NativeBaseProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

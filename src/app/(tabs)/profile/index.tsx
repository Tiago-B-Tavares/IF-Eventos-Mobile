import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import SignOutButton from '@/src/components/SignOutButton';

export default function Profile() {
  return (
    <>

      <View style={styles.container}>
        <Pressable onPress={() => router.push('/profile/settings')}>
         <Text className='text-lg'>
         <Ionicons name="person" size={14} color={'#fff'} />
         </Text>
        </Pressable>
        <SignOutButton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});


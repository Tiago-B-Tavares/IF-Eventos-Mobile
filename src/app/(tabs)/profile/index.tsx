import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import SignOutButton from '@/src/components/SignOutButton';
import { useUser } from '@clerk/clerk-expo';



export default function Profile() {
  const { user } = useUser();
const sex = user?.publicMetadata.gender as string

  return (
    <>

      <View style={styles.container}>
        <Pressable onPress={() => router.push('/profile/settings')}>
         <Text className='text-lg'>
         <Ionicons name="person" size={14} color={'#fff'} />
         </Text>
        </Pressable>
        <Pressable onPress={() => router.push('/profile/settings')}>
         <Text className='text-lg'>
         <Ionicons name="settings" size={24} color={'#fff'} />
         </Text>
         <Text className='text-lg text-white'>
         {sex}
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
    gap: 50
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});


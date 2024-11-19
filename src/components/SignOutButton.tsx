import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';

const SignOutButton: React.FC = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable
      onPress={handleSignOut}
      style={[styles.container, styles.button]}
    >
      <Text style={styles.text}>
        Sair
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#e63946',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignOutButton;


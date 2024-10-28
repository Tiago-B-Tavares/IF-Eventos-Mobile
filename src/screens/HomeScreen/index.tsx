import React from 'react';
import {View, Text, Button} from 'react-native';


import {styles} from './styles';
import { useAuth } from '../../contexts/Auth';

export function HomeScreen() {
  const {signOut} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Button
     
        onPress={signOut}
        title="Sair do App"
      />
    </View>
  );
}
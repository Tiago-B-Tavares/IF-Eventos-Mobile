import { View, Text, StyleSheet } from 'react-native';

import React from 'react';

export default function Profile() {
  
  return (
    <>

      <View style={styles.container}>
      

         <Text>
         Config
         </Text>
   
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});


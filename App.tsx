import React from 'react';
import { Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Login from './src/pages/login';

// Adicionando os ícones à biblioteca
library.add(faEnvelope, faLock);

export default function App() {
  return (
   <>
    <Login />
   </>
  );
}



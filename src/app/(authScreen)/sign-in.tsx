import React, { useState, useCallback } from 'react';
import { Alert, Button, Image } from 'react-native';
import { useClerk, useSignIn } from '@clerk/clerk-expo';
import { Link, router, Stack } from 'expo-router';
import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import SignInWithOAuth from '@/src/components/SignInWithOAuth';
import SignInWithFacebook from '@/src/components/SignInWithFacebook';

const statusBarHeight = Constants.statusBarHeight;

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Alterna a visibilidade da senha
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Lida com o envio do formulário de login
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('./(tabs)');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));

      if (err.status === 400) {
        Alert.alert('Atenção', 'Email ou senha incorretos.');
      }

    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={{ paddingTop: 8 + statusBarHeight, marginHorizontal: 16 }}>


      <View className='w-3/4 h-28 flex items-start justify-center my-12'>
        <Text className='text-4xl font-bold flex-wrap text-[border-[#166534]]' style={{ color: '#098239' }}>
          Bem vindo(a) Acesse a sua conta
        </Text>
      </View>

      <View className='flex flex-col gap-6 mt-8 w-full '>
        {/* Campo de Email */}
        <View className='flex flex-row gap-3 items-center pb-2 mb-4 px-3 border-b-2' style={{ borderBottomColor: '#166534' }}>
          <FontAwesome6 name="envelope" size={20} color="#166534" />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            placeholderTextColor="#166534"
            onChangeText={setEmailAddress}
          />
        </View>

        {/* Campo de Senha */}
        <View
          className='flex flex-row gap-3 items-center justify-between pb-2 px-3 border-b-2 '
          style={{ borderBottomColor: '#166534' }}
        >

          <View
            className='flex flex-row items-center gap-3 '
          >
            <FontAwesome6 name="lock" size={20} color="#166534"/>
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#166534"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
          </View>

          <TouchableOpacity onPress={handleToggleShowPassword}>
            <FontAwesome6
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#166534"
            />
          </TouchableOpacity>
        </View>

        {/* Botão de Entrar */}
        <TouchableOpacity onPress={onSignInPress}
          className='w-full h-12 mt-6 flex items-center justify-center  bg-[#fd7e08]  border-none rounded-2xl'>
          <Text className='text-lg font-semibold text-white '>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* Link para Cadastro */}
        <View className='flex flex-row gap-2 justify-end items-center pr-2 my-4'>

          <Text className='text-gray-500 text-sm'>Não possui uma conta?</Text>
          <Link href="/sign-up" className=' border-b-2 border-gray-500 '>
            <Text className='text-gray-500 text-base flex '>Cadastre-se</Text>
          </Link>
        </View>

        <View className=" w-full justify-between flex flex-row items-center p-4">
          <View className=" w-1/3 h-px bg-gray-300" />
          <Text className="w-1/3bg-gray-100  text-gray-500">ou</Text>
          <View className=" w-1/3 h-px bg-gray-300" />
        </View>


        {/* Login com Redes Sociais */}
        <View className='mt-4 flex flex-col gap-4'>
          <SignInWithOAuth/>
          <SignInWithFacebook />
        </View>
      </View>
    </View>
  );
}

import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      if (err?.status === 422) {
        Alert.alert("Atenção", "Email já cadastrado.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("../(tabs)");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      if (err?.status === 422) {
        Alert.alert("Atenção", "Email já cadastrado.");
      } else {
        Alert.alert("Erro", "Código inválido ou expirado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({
    value,
    placeholder,
    secureTextEntry = false,
    onChangeText,
  }: {
    value: string;
    placeholder: string;
    secureTextEntry?: boolean;
    onChangeText: (text: string) => void;
  }) => (
    <TextInput
      className="border border-green-700 rounded-lg px-4 py-3 text-gray-700 mb-4"
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#6A6A6A"
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      onChangeText={onChangeText}
    />
  );

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : !pendingVerification ? (
        <View className="w-full">
          <Text className="text-3xl font-bold text-green-800 mb-1 text-center">
            Criar Conta
          </Text>
          <Text className="text-lg text-green-700 mb-6 text-center">
            Preencha os campos abaixo para se cadastrar
          </Text>

          <InputField
            value={firstName}
            placeholder="Nome..."
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <InputField
            value={lastName}
            placeholder="Sobrenome..."
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <InputField
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <InputField
            value={password}
            placeholder="Senha..."
            secureTextEntry
            onChangeText={(password) =>{ if(password.length <= 8) setPassword(password)

            } }
          />

          <TouchableOpacity
            className="bg-orange-500 rounded-lg py-3 mb-4"
            onPress={onSignUpPress}
          >
            <Text className="text-white text-center font-bold text-lg">
              Cadastrar
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-700">Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => router.replace("./sign-in")}>
              <Text className="text-blue-600 font-bold ml-1">Entre</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-lg text-green-700 mb-6 text-center">
            Insira o código enviado para o seu email
          </Text>
          <InputField
            value={code}
            placeholder="Código de verificação..."
            onChangeText={setCode}
          />
          <TouchableOpacity
            className="bg-orange-500 rounded-lg py-3"
            onPress={onPressVerify}
          >
            <Text className="text-white text-center font-bold text-lg">
              Verificar Código
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

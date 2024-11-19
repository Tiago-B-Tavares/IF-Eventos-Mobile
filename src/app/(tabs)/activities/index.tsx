import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'native-base';
import Constants from 'expo-constants';
import { api } from '@/services/setupApiClient';
import { EventoProps } from "@/types/interfaces";

const statusBarHeight = Constants.statusBarHeight;

export default function Activities() {
  const [eventos, setEventos] = useState<EventoProps[]>([]);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await api.get('/todos-eventos');
        setEventos(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventos();
  }, []);

  return (
    <View className="flex flex-1 bg-gray-100" style={{ marginTop: statusBarHeight, marginBottom: 60 }}>
      {/* Logo */}
      <View className="w-full h-12 mb-3 items-center justify-center bg-white rounded-t-3xl shadow-md">
        <Image
          source={require('../../../assets/images/logo003.png')}
          className="w-40 h-full"
          resizeMode="contain"
          alt="logo"
        />
      </View>

      {/* Conteúdo */}
      <ScrollView className="px-4">
        {eventos.map((evento) => (
          <View key={evento.id} className="mb-5 p-4 bg-teal-100 rounded-lg shadow">
            {/* Nome do Evento */}
            <Text className="text-lg font-bold text-teal-800 mb-2">Evento: {evento.nome}</Text>

            {/* Atividades */}
            {evento.atividades.map((atividade) => (
              <View key={atividade.id} className="mb-4 p-3 bg-white rounded-md shadow">
                {/* Nome da Atividade */}
                <Text className="text-base font-semibold text-gray-700">Atividade: {atividade.nome}</Text>

                {/* Organizadores */}
                {atividade.organizadores.map(({ organizador }) => (
                  <Text key={organizador.id} className="text-sm text-gray-500 mt-1">
                    Organizador: {organizador.nome}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

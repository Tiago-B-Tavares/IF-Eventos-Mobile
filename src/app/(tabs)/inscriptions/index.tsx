import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, FlatList } from 'react-native';

import { useAuth } from '@clerk/clerk-expo';

import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { api } from '@/services/setupApiClient';
import { InscriptionProps } from '@/types/interfaces';


export default function Inscriptions() {
  const { isLoaded, userId } = useAuth();
  const [inscriptions, setInscriptions] = useState<InscriptionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch inscrições do usuário
  const getInscriptions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await api.get(`/myInscriptions?user_id=${userId}`);
      setInscriptions(response.data);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Cancelar inscrição
  const cancelInscription = async (atividade_id: string, participante_id: string) => {
    if (!userId) return;

    try {
      await api.delete(`/inscrever`, {
        data: {
          atividade_id,
          participante_id,
        },
      });
      // Atualize a lista localmente, caso o backend não retorne a lista atualizada
      setInscriptions((prev) =>
        prev.filter((inscription) => inscription.atividade_id !== atividade_id)
      );
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      getInscriptions();
    }
  }, [isLoaded, getInscriptions]);

  // Renderizando o estado de carregamento
  if (loading && inscriptions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  // Renderizando as inscrições
  return (
    <GestureHandlerRootView className="flex-1 bg-gray-100">
      <FlatList
        data={inscriptions}
        keyExtractor={(item) => item.atividade_id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={getInscriptions} />}
        ListEmptyComponent={
          <View className="px-4 py-8 justify-center items-center">
            <Ionicons name='information-circle' size={52} color="#ef4444" />
            <Text className="text-center text-xl text-green-800 ">
              Você ainda não se inscreveu em nenhuma atividade.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-white rounded-lg shadow-lg items-stretch justify-center ">
            <Text className="text-2xl font-bold text-green-800">
              {item.atividade.nome}
            </Text>
            <View className='justify-start  items-center flex flex-row gap-3'>

              <View className="text-gray-600 mt-1 text-lg  flex  flex-row  gap-2 flex-wrap justify-between items-center ">
                <Text className='text-lg font-semibold'>
                  Sobre a atividade: 
                </Text>
                <Text>
                  {item.atividade.descricao}
                </Text>
              </View>
            </View>
            <View className='justify-start  items-center flex flex-row gap-3'>
              <Ionicons name="time" size={20} color="#FFA500" />
              <Text className="text-gray-600 mt-1 text-lg  flex  justify-between items-center ">
                {item.atividade.horario}
              </Text>
            </View>
            <View className='justify-start  items-center flex flex-row gap-3'>
              <Ionicons name="location" size={20} color="#FFA500" />
              <Text className="text-gray-600 mt-1 text-lg  flex  justify-between items-center ">
                {item.atividade.local}
              </Text>
            </View>
            <View className='justify-start  items-center flex flex-row gap-3'>
              <MaterialIcons name="confirmation-number" size={24} color="#FFA500" />
              <Text className="text-gray-600 mt-1 text-lg  flex  justify-between items-center ">
                {item.atividade.vagas}
              </Text>
            </View>


            <Pressable
              onPress={() => cancelInscription(item.atividade_id, userId!)}
              className="mt-4 bg-red-500 p-2 rounded-lg items-center"
            >
              <Text className="text-white font-semibold">Cancelar inscrição</Text>
            </Pressable>
          </View>
        )}
        className="px-4 py-4"
      />
    </GestureHandlerRootView>
  );
}
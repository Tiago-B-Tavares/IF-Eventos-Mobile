import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { api } from '@/services/setupApiClient';
import { useAuth } from '@clerk/clerk-expo';
import { InscriptionProps } from '@/types/interfaces';
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00f" />
      </View>
    );
  }

  // Renderizando as inscrições
  return (
    <GestureHandlerRootView className="flex-1">
      <FlatList
        data={inscriptions}
        keyExtractor={(item) => item.atividade_id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={getInscriptions} />}
        ListEmptyComponent={
          <View className="px-4 py-8">
            <Text className="text-center text-lg text-gray-600">
              Você ainda não se inscreveu em nenhuma atividade.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-white rounded-lg shadow-lg">
            <Text className="text-xl font-semibold text-gray-800">
              {item.atividade.nome}
            </Text>
            <Text className="text-gray-600">{item.atividade.horario}</Text>
            <Text className="text-gray-600">{item.atividade.local}</Text>
            <Text className="text-gray-600">
              {item.atividade.vagas} vagas restantes
            </Text>
            <Pressable
              onPress={() => cancelInscription(item.atividade_id, userId!)}
              className="mt-4 bg-red-500 p-2 rounded-lg items-center"
            >
              <Text className="text-white font-semibold">Cancelar inscrição</Text>
            </Pressable>
          </View>
        )}
        className="bg-gray-100 py-4"
      />
    </GestureHandlerRootView>
  );
}

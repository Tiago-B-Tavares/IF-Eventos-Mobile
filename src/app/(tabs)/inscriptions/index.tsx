import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator, Pressable, FlatList, Alert, Button, Modal } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { api } from '@/services/setupApiClient';
import { InscriptionProps } from '@/types/interfaces';


import ReadQrCode from './components/readQrCode';



export default function Inscriptions() {

  const { isLoaded, userId } = useAuth();
  const [inscriptions, setInscriptions] = useState<InscriptionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  


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



  

  const cancelInscription = async (atividade_id: string, participante_id: string) => {
    if (!userId) return;
    try {
      await api.delete('/inscrever', { data: { atividade_id, participante_id } });
      setInscriptions((prev) => prev.filter((inscription) => inscription.atividade_id !== atividade_id));
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
    }
  };


  useEffect(() => {
    if (isLoaded) {
      getInscriptions();

    }

  }, [isLoaded, getInscriptions]);


  if (loading && inscriptions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-100" style={{ marginBottom:65}}>
      <FlatList
        data={inscriptions}
        keyExtractor={(item) => item.atividade_id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={getInscriptions} />}
        ListEmptyComponent={
          <View className="px-4 py-8 justify-center items-center">
            <Ionicons name="information-circle" size={52} color="#ef4444" />
            <Text className="text-center text-xl text-gray-800">
              Você ainda não se inscreveu em nenhuma atividade.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <Text className="text-2xl font-bold text-green-700">{item.atividade.nome}</Text>
            <View className="mt-2">
              <Text className="text-gray-600">
                <Text className="font-semibold">Descrição:</Text> {item.atividade.descricao}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="time" size={20} color="#FFA500" />
              <Text className="ml-2 text-gray-600">{item.atividade.horario}</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="calendar" size={20} color="#FFA500" />
              <Text className="ml-2 text-gray-600">{item.atividade.data}</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Ionicons name="location" size={20} color="#FFA500" />
              <Text className="ml-2 text-gray-600">{item.atividade.local}</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialIcons name="confirmation-number" size={20} color="#FFA500" />
              <Text className="ml-2 text-gray-600">{item.atividade.vagas} vagas disponíveis</Text>
            </View>
            <View className="flex-row mt-4 gap-2">
              <Pressable
                onPress={() => cancelInscription(item.atividade_id, userId!)}
                className="flex-1 rounded-lg flex-col items-center justify-center p-2" style={{ backgroundColor: '#ef4444' }}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
                <Text className="text-white font-semibold">Cancelar</Text>
              </Pressable>

              <Pressable className="flex-1 bg-green-500 rounded-lg items-center p-2" disabled={false} style={{ backgroundColor: '#10b981' }}
              >
                <ReadQrCode title='Check-in' type='checkin' />
              </Pressable>
              <Pressable className="flex-1 rounded-lg bg-blue-500 items-center p-2" style={{ backgroundColor: '#3b82f6' }} >
                <ReadQrCode title='Check-out' type='checkout' />
              </Pressable>
            </View>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
}

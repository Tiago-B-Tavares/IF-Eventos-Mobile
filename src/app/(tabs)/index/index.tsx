import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, FlatList, ScrollView } from 'react-native';
import { Image } from 'native-base';
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { api } from '@/services/setupApiClient';
import { useAuth, useSession, useUser } from '@clerk/clerk-expo';
import Card from '@/src/components/CardEvento';
import Title from '@/src/components/Title';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface EventoProps {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  horario: string;
  local: string;
  banner: string;
  organizador_id: string;
}

export default function InitialScreen() {
  const { isLoaded} = useAuth();
  const {  user } = useUser();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  const fetchEventos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/todos-eventos');
      setEventos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      fetchEventos();
    }
  }, [isLoaded, fetchEventos]);

  if (loading && eventos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00f" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1" style={{ marginBottom: 60 }}>
      <View>
        <Text>
          Olá, {user?.firstName}
        </Text>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchEventos} />}
      >
        <View className="flex flex-col gap-4 border">
          <Title titleText="Últimos Eventos" />
          {eventos.map((evento) => (
            <Card
              key={String(evento.id)}
              id={String(evento.id)}
              image={evento.banner}
              title={evento.nome}
              description={evento.descricao}
              local={evento.local}
              dateInitial={evento.dataInicio}
              dateFinal={evento.dataFim}
            />
          ))}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

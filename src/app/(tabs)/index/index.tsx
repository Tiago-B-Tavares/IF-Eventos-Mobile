import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert, RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { api } from '@/services/setupApiClient';
import Title from '@/src/components/Title';
import Card from '@/src/components/CardEvento';


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
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Função para buscar eventos
  const fetchEventos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/todos-eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (isLoaded && user) {
      fetchEventos();
      
    }
  }, [isLoaded, user]);


  if (loading && eventos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00f" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center mx-4" style={{ marginBottom: 70 }}>
      <View>
        <Text>Olá, {user?.firstName}</Text>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchEventos} />}
      >
        <View className="flex flex-col gap-4 justify-center">
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

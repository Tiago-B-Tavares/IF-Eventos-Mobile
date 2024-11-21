import { ScrollView, View, Text, Pressable } from 'react-native';
import { Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { api } from '@/services/setupApiClient';
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
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const lastEvents = eventos

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
    <View className="flex-1  " style={{ marginBottom: 60 }}>
      <ScrollView className=''>
        <View className="flex flex-col gap-4 border ">
          <Title titleText="Últimos Eventos" />
         
          {lastEvents.map((evento) => (
            <Card
              id={String(evento.id)}
              key={evento.id}
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

    </View>
  );
}

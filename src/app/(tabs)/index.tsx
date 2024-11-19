import { ScrollView, View, Text } from 'react-native';
import { Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { api } from '@/services/setupApiClient';
import Card from '@/src/components/Cards';
import Title from '@/src/components/Title';

const statusBarHeight = Constants.statusBarHeight;

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

export default function Home() {
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
    <View className="flex-1 mx-4" style={{ marginTop: statusBarHeight, marginBottom: 60 }}>
      {/* Header Section */}
      <View className="w-full h-16 mb-4 items-center justify-center bg-white rounded-t-3xl">
        <Image
          source={require('../../assets/images/logo003.png')}
          alt="logo"
          resizeMode="contain"
          className="w-36 h-full"
        />
      </View>

      <ScrollView>
        <View className="flex flex-col gap-4">
          <Title titleText="Últimos Eventos" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row "
          >
            {lastEvents.map((evento) => (
              <Card
                key={evento.id}
                image={evento.banner}
                title={evento.nome}
                description={evento.descricao}
                local={evento.local}
                dateInitial={evento.dataInicio}
                dateFinal={evento.dataFim}
              />
            ))}
          </ScrollView>
        </View>

        {/* Horizontal ScrollView for Eventos Populares */}
        <View>
          <Title titleText="Eventos Populares" />

        <View>
          <Text>Adicionar mais alguma coisa na sessao</Text>
        </View>


        </View>
      </ScrollView>




    </View>
  );
}

import { api } from "@/services/setupApiClient";
import Title from "@/src/components/Title";
import { AtividadesProps } from "@/types/interfaces";
import { useAuth } from "@clerk/clerk-expo";
import { useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

export default function Atividades() {
  const { id } = useGlobalSearchParams(); // Desestruture diretamente o id
  const [activity, setActivity] = useState<AtividadesProps[]>([]);
  const { isLoaded, userId, sessionId } = useAuth(); // Carregar informações do usuário


  async function setInscription(atividade_id: string, user_Id: string) {
    try {
      const response = await api.post(`/inscrever`, {
        atividade_id,
        participante_id: user_Id,
      });
  
      if (response.status === 201) {
        // Atualize a lista de atividades localmente
        setActivity((prevActivities) =>
          prevActivities.map((atividade) =>
            atividade.id === atividade_id
              ? { ...atividade, inscrito: true }
              : atividade
          )
        );
      }
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
    }
  }
  

  useEffect(() => {
    async function getActivity() {
      try {

        const response = await api.get(`/evento/atividades?eventoId=${id}`);

        setActivity(response.data);

      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    }



    if (isLoaded && userId && id) {
      getActivity();

    }
  }, [id, userId, isLoaded]);

  return (
    <ScrollView className="flex flex-1">
      <Title titleText="Atividades" />
      {
        activity.length > 0 ? (
          activity.map((atividade) => (
            <View key={atividade.id} className="w-fullflex flex-col justify-center items-center bg-white p-4 m-4 gap-3">
             
                <Text>{atividade.nome}</Text>
                <Text>Evento ID: {id}</Text>
                <Text>Usuário ID: {userId}</Text>
                <Pressable className="p-4 border rounded-lg " onPress={() => {
                  setInscription(atividade.id as string, userId as string);
                }}>
                  <Text className="m-4">Participar</Text>
                </Pressable>
              </View>
         
          ))
        ) : (
          <Text>Nenhuma atividade encontrada.</Text>
        )
      }
    </ScrollView>
  );
}

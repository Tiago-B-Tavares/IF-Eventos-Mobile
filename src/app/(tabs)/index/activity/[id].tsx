import { api } from "@/services/setupApiClient";
import Title from "@/src/components/Title";
import { AtividadesProps } from "@/types/interfaces";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { RefreshControl, GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from "react-native-root-toast";

export default function Atividades() {
  const { id } = useGlobalSearchParams();
  const [activity, setActivity] = useState<AtividadesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, userId } = useAuth();


  async function setInscription(atividade_id: string, user_Id: string) {
    try {
      const response = await api.post(`/inscrever`, {
        atividade_id,
        participante_id: user_Id,
      });

      if (response.status === 201) {
        setActivity((prevActivities) =>
          prevActivities.map((atividade) =>
            atividade.id === atividade_id
              ? { ...atividade, inscrito: true }
              : atividade
          )
        );
        Toast.show("Inscrição realizada com sucesso!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao realizar inscrição.";
      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  }

  async function getActivity() {
    setLoading(true);
    try {
      const response = await api.get(`/evento/atividades?eventoId=${id}`);
      setActivity(response.data || []);
      console.log(JSON.stringify(response.data));
      
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {

    if (isLoaded && userId && id) {
      getActivity();
    }
  }, [id, userId, isLoaded]);


  const isAlreadyInscribed = (atividadeId: string) => {
    const atividade = activity.find((atividade) => atividade.id === atividadeId);
    return atividade?.inscricoes.some(
      (inscricao) => inscricao.participante_id === userId
    );
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-100" style={{ marginBottom: 60 }}  >
      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={async () => getActivity()} />
        }
        ListEmptyComponent={
          <View className="px-4 py-8 justify-center items-center">
            <Ionicons name="information-circle" size={52} color="#ef4444" />
            <Text className="text-center text-xl text-green-800">
              Você ainda não se inscreveu em nenhuma atividade deste evento.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View key={item.id} className="w-full bg-white shadow-lg rounded-lg p-6 mb-4">
            <View className="flex flex-row items-center gap-2">
             
              <Text className="text-3xl font-bold text-green-800 mb-2">{item.nome}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="document-text" size={20} color="red.600" />
              <Text className="text-base  text-orange-800 mb-2">{item.descricao}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="time" size={20} color="red.600" />
              <Text className="text-base font-bold text-orange-800 mb-2"> {new Date(item.horario).getHours()+3 + "H" + new Date(item.horario).getMinutes()} </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="location" size={20} color="red.600" />
              <Text className="text-base font-bold text-orange-800 mb-2"> {item.local}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="ticket" size={20} color="red.600" />
              <Text className="text-base font-bold text-orange-800 mb-2"> {item.vagas}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Ionicons name="information-circle" size={20} color="red.600" />
              <Text className="text-base font-bold text-orange-800 mb-2"> {item.tipo}</Text>
            </View>

            
           
         
            

            <View className="mt-2">
              <Text className="font-semibold mb-1">Proponentes:</Text>
              {item.organizadores.map((org, index) => (
                <View key={index} className="mb-1 border-2  rounded-lg " style={{ borderColor: "#93c5fd", width: "auto", flexDirection: "row", gap: 5 }} >
                  <Ionicons name="person" size={20} color="#93c5fd" />
                  <Text className=" mb-1 ml-2 " style={{ color: "#93c5fd" }}>
                    {org.organizador.nome}
                  </Text>
                </View>

              ))}
            </View>

            <Pressable
              className={`mt-4 p-3 rounded-lg ${isAlreadyInscribed(item.id) ? "bg-orange-600" : "bg-green-500"}`}
              onPress={() => {
                if (!isAlreadyInscribed(item.id)) {
                  setInscription(item.id, userId as string);
                }
              }}
              disabled={isAlreadyInscribed(item.id)}
            >

              <Text className="text-center text-white font-bold p-4">
                {isAlreadyInscribed(item.id) ? "Você já está Inscrito" : "Participar"}
              </Text>
            </Pressable>
          </View>
        )}
        className="px-4 py-4"
      />
    </GestureHandlerRootView>
  );
}

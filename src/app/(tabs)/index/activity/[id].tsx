import { api } from "@/services/setupApiClient";
import Title from "@/src/components/Title";
import { AtividadesProps } from "@/types/interfaces";

import { Link, useGlobalSearchParams,  } from "expo-router";
import {  } from "native-base";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Atividades() {
    const local = useGlobalSearchParams();
    const [activity, setActivity] = useState<AtividadesProps[]>([]);

  
    useEffect(() => {
      async function getActivity() {
        try {
          const response = await api.get(`/evento/atividades?=${local.id}`);
          setActivity(response.data);
        } catch (error) {
          console.error(error);
        }
      }
  
      getActivity();
    }, []);
   
    return (
        <ScrollView className="flex flex-1">
            <Title titleText="Atividades"/>
            {
                activity.map((atividade) => (
                    
                    <View key={atividade.id}>
                      
                        <Text>{atividade.nome}</Text>
                        <Text>evento id: {local.id}</Text>
                    
                       
                    </View>
                ))
            }
         
          
        </ScrollView>
    );
}

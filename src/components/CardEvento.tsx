import { Ionicons } from "@expo/vector-icons";
import { Box, Stack, Image, View, Spinner } from "native-base";
import React from "react";
import { Text, TouchableOpacity, Button } from "react-native";
import ModalComponent from "./Modal";
import { router } from "expo-router";

export default function Card({id, image, title, local, dateInitial, dateFinal, description }: any) {
    const [expanded, setExpanded] = React.useState(false);
    const [isLoading, setisLoading] = React.useState(false);
console.log("id recebido",id);

    return (
        <Box
            className="flex m-2 pt-4 h-1/2  w-screan items-center bg-white"
            borderRadius="lg"
            shadow="2"
            overflow="hidden"
            _light={{ backgroundColor: "gray.50" }}
            _dark={{ backgroundColor: "gray.700" }}
        >
            {/* Image Section */}
            <Box className="flex items-center justify-center mt-3 rounded-lg  ">
                <Image
                    source={{ uri: image }}
                    alt="Evento"
                    className="rounded-lg mx-2 mt-2 "
                    width={'80'}
                    height={'200px'}
                    resizeMode="cover"
                />
            </Box>

            {/* Content Section */}
            <Stack p={4} space={1} className="mb-2 ">
                <Stack>
                    <Text className="text-lg font-bold text-orange-700" numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                </Stack>
                <View className="flex flex-row items-start  gap-3">
                    <View className="flex flex-row ">
                        <Ionicons name="location" size={14} color="#c2410c" />
                        <Text className="text-xs text-orange-700">{local}</Text>
                    </View>
                    <View className="flex flex-row items-center ">
                        <Ionicons name="calendar" size={14} color="#c2410c" />
                        <Text className="text-xs text-orange-700">
                            {dateInitial} - {dateFinal}
                        </Text>
                    </View>
                </View>
                <View className="flex">
                    <Text
                        className="text-sm text-green-700 text-left  "
                        numberOfLines={expanded ? undefined : 3}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setExpanded(!expanded)}
                        className="flex flex-row justify-end "
                    >
                        <Text className="text-sm font-bold text-green-700 border-b-2 border-green-700 text-center">
                            {expanded ? "Ver menos" : "Ver mais"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className="flex justify-center mt-4  rounded-lg bg-orange-600 p-2"
                    style={{ backgroundColor: "#ea580c" }}
                    onPress={() => {
                        router.push(`./activity/${id}`)
                       
                        
                        setisLoading(isLoading);
                    }}

                >
                    <Text className="text-white font-bold text-center" >
                        {isLoading ? <Spinner size="sm" color="white" /> : 'Ver atividades'}
                    </Text>
                </TouchableOpacity>

            </Stack>
        </Box>

    );
}

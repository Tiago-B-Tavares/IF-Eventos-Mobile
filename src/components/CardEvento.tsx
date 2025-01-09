import { Ionicons } from "@expo/vector-icons";
import { Box, Stack, Image, View, Spinner } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Card({ id, image, title, local, dateInitial, dateFinal, description }: any) {
    const [expanded, setExpanded] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const dataInitialFormatada = `${new Date(dateInitial).getDate() + 1}/${meses.map((m) => m)[new Date(dateInitial).getMonth()]}/${new Date(dateInitial).getFullYear()}`;
    const dataFinalFormatada = `${new Date(dateFinal).getDate() + 1}/${meses.map((m) => m)[new Date(dateFinal).getMonth()]}/${new Date(dateFinal).getFullYear()}`



    return (
        <Box
            key={id}
            className="flex rounded-lg m-4"
            borderRadius="lg"
            shadow="9"
            _light={{ backgroundColor: "gray.50" }}
            _dark={{ backgroundColor: "gray.700" }}
        >
            {/* Image Section */}
            <Box className="flex items-center w-full justify-center  rounded-lg ">
                <Image
                    source={{ uri: image as string }}
                    alt="Evento"
                    className="rounded-t-lg w-full"
                    height={'200px'}
                    resizeMode="cover"

                />
            </Box>

            {/* Content Section */}
            <Stack p={4} space={3}  >
                <Stack>
                    <Text className="text-2xl font-bold text-orange-700" numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                </Stack>

                <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                        <Ionicons name="location" size={20} color="#c2410c" />
                        <Text className="text-base text-orange-700">{local}</Text>
                    </View>

                    <View className="flex flex-row items-center gap-2">
                        <Ionicons name="calendar" size={20} color="#c2410c" />
                        <Text className="text-base text-orange-700">
                            {dataInitialFormatada} - {dataFinalFormatada}
                        </Text>
                    </View>
                </View>

                <View>
                    <Text
                        className="text-base text-green-700"
                        numberOfLines={expanded ? undefined : 3}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                    <TouchableOpacity onPress={() => setExpanded(!expanded)} className="mt-2">
                        <Text className="text-sm font-bold text-green-700 border-b-2 border-green-700 ">
                            {expanded ? "Ver menos" : "Ver mais"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    className="mt-4 p-4 rounded-lg bg-orange-600"
                    style={{ backgroundColor: "#ea580c" }}
                    onPress={() => {
                        setIsLoading(true);
                        router.push(`./activity/${id}`);
                        setTimeout(() => setIsLoading(false), 1000); // Simulating loading
                    }}
                >
                    {isLoading ? (
                        <Spinner size="sm" color="white" />
                    ) : (
                        <Text className="text-white font-bold text-center">Ver atividades</Text>
                    )}
                </TouchableOpacity>
            </Stack>
        </Box>
    );
}

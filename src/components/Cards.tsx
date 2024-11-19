import { Ionicons } from "@expo/vector-icons";
import { Box, Stack, Image, View } from "native-base";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Card({ image, title, local, dateInitial, dateFinal, description }: any) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Box
            className="flex m-2 w-64 bg-white"
            borderRadius="lg"
            shadow="2"
            overflow="hidden"
            _light={{ backgroundColor: "gray.50" }}
            _dark={{ backgroundColor: "gray.700" }}
        >
            {/* Image Section */}
            <Box className="flex items-center justify-center rounded-lg ">
                <Image
                    source={{ uri: image }}
                    alt="Evento"
                    className="rounded-lg mx-2 mt-2 "
                    width="95%"
                    height={150}
                    resizeMode="cover"
                />
            </Box>

            {/* Content Section */}
            <Stack p={4} space={1}>
                <Stack>
                    <Text className="text-sm font-bold text-orange-700" numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                </Stack>
                <View className="flex flex-row items-center  justify-between">
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
                <Text
                    className="text-sm text-green-700 text-left"
                    numberOfLines={expanded ? undefined : 3}
                    ellipsizeMode="tail"
                >
                    {description}
                </Text>
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    className="mt-2 px-4 py-2 rounded-lg bg-orange-600"
                >
                    <Text className="text-sm font-semibold text-white text-center">
                        {expanded ? "Ver menos" : "Ver mais"}
                    </Text>
                </TouchableOpacity>
            </Stack>
        </Box>
    );
}

import { View, Text } from "react-native";

export default function Title(props: { titleText: string }) {
    return (
      <View className="flex  mt-2 border-b border-green-600 mb-2">
        <Text className="text-2xl text-slate-900 font-bold opacity-85">
          {props.titleText}
        </Text>
      </View>
    )
  }
import { View, Text } from "react-native";

export default function Title(props: { titleText: string }) {
    return (
      <View className="flex border-b border-slate-700 mb-2">
        <Text className="text-3xl text-slate-900 font-bold  m-4 opacity-85">
          {props.titleText}
        </Text>
      </View>
    )
  }
import { View, Text } from "react-native";

export default function Title(props: { titleText: string }) {
    return (
      <View className="flex border-b border-slate-700 ">
        <Text className="text-2xl text-slate-900 font-bold  opacity-70 my-4 ml-4">
          {props.titleText}
        </Text>
      </View>
    )
  }
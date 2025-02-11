import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import SignOutButton from '@/src/components/SignOutButton';
import { router } from 'expo-router';

export default function Profile() {
  const { user } = useUser();

  return (
    <View className="flex-1 justify-center items-center gap-4 bg-white border border-gray-400">
      <View className=" p-4 mt-6 justify-between items-center">
        <Ionicons name="person" size={50} color="#9ca3af" className='border-2 border-grey-200 rounded-full p-4' />
        {user?.fullName && <Text className="text-2xl ">{user?.fullName}</Text>}
        {user?.emailAddresses[0]?.emailAddress && (
          <Text className="text-lg text-green-700 p-4">{user?.emailAddresses[0]?.emailAddress}</Text>
        )}
      </View>
      <View className='flex flex-col gap-4'>
        <Pressable onPress={() => router.push('/profile/settings')}>
          <Text className="text-lg text-orange-500">Alterar dados pessoais</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/profile/settings')}>
          <Text className="text-lg text-orange-500">Excluir conta</Text>
        </Pressable>
        <SignOutButton />
      </View>

    </View>
  );
}

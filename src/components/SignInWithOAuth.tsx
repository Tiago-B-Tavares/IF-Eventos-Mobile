import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Text, View, Button, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View className='flex flex-row items-center justify-center gap-4 border-2 border-gray-400 rounded-2xl p-2 mb-4'>
      <Image source={require('../assets/images/google.png')} style={{ width: 25, height: 25 }} />
      <Pressable onPress={onPress}>
        <Text className='text-lg text-gray-600'>Entrar com Google</Text>
      </Pressable>
    </View>
  )
}
export default SignInWithOAuth
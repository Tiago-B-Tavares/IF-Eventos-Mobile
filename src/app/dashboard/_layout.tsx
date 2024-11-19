import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import "../../styles/global.css";
import { useFonts } from 'expo-font';
export default function AuthRoutesLayout() {
  
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
 
    <Slot />
)

}
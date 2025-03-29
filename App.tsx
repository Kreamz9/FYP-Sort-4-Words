import { StyleSheet } from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH  } from './FirebaseConfig';

import Login from './app/screens/Login';
import HomeScreen from './app/screens/Home'
import NormalModeSelectionScreen from './app/screens/NormalMode/NormalModeSelectionScreen';
import NormalEasy from './app/screens/NormalMode/NormalEasy';
import NormalHard from './app/screens/NormalMode/NormalHard';
import NormalZen from './app/screens/NormalMode/NormalZen';
import WordsOfTheDayScreen from './app/screens/WordsOfTheDay/WordsOfTheDay';
import { getWordsOfTheDay } from './app/firestore/importExportFirestore';

// API Key for Words of the Day
export const apiKey = "5x5tk6pu1v1qp3nv820bb1ul2gy3h3d8aml1jy0ar7rsiljvl";
export let globalUserId = "";

const Stack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

function LoggedInLayout() {
  // Get Words for the Day
  getWordsOfTheDay();

  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />

      {/* Normal Mode */}
      <LoggedInStack.Screen name="Normal Mode Selection Screen" component={NormalModeSelectionScreen} options={{ headerShown: false}} />
      <LoggedInStack.Screen name="Normal Easy Mode" component={NormalEasy} options={{ headerShown: false}} />
      <LoggedInStack.Screen name="Normal Hard Mode" component={NormalHard} options={{ headerShown: false}} />
      <LoggedInStack.Screen name="Normal Zen Mode" component={NormalZen} options={{ headerShown: false}} />
    
      {/* Category Mode */}

      {/* Words of The Day */}
      <LoggedInStack.Screen name="Words of the Day" component={WordsOfTheDayScreen} options={{ headerShown: false}} />
    </LoggedInStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      globalUserId = user?.uid;
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? 
          <Stack.Screen name="LoggedIn" component={LoggedInLayout} options={{headerShown: false}} /> :
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

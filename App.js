import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import { StyleSheet, View } from 'react-native';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Roboto_100Thin,
          Roboto_100Thin_Italic,
          Roboto_300Light,
          Roboto_300Light_Italic,
          Roboto_400Regular,
          Roboto_400Regular_Italic,
          Roboto_500Medium,
          Roboto_500Medium_Italic,
          Roboto_700Bold,
          Roboto_700Bold_Italic,
          Roboto_900Black,
          Roboto_900Black_Italic,
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        // console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayout} style={styles.container}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
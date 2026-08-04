/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import { NewAppScreen } from '@react-native/new-app-screen';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { DrawerNavigation } from './navigator/mainNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <DrawerNavigation />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen templateFileName="App.tsx" safeAreaInsets={safeAreaInsets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import { useEffect } from 'react';

import { StatusBar, useColorScheme } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from '@contexts/themeContext';
import { seedCache } from '@modules/cache/cache.utils';

import { RootNavigator } from '@app/navigator/mainNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    seedCache();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

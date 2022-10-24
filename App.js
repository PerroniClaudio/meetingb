import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './app/store';
import { Provider } from 'react-redux'

import Middleware from './components/Middleware';
import Toast from 'react-native-toast-message';


import "./styles";

export default function App() {

    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Middleware />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
}

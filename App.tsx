import {NavigationContainer} from '@react-navigation/native';
import { NativeBaseProvider} from "native-base";
import { Provider } from 'react-redux';
import { HomeStack } from './src/navigation/HomeStack';
import { store } from './store/store';


export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <HomeStack/>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
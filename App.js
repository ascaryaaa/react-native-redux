import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login.js';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import store from './reducers';
import Detail from './screens/Detail.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              title:'Login',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              title:'Home',
              headerShown: false,
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen 
            name="Detail" 
            component={Detail} 
            options={{
              title:'Detail',
              headerTitleAlign: 'center'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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

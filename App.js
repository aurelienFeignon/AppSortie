import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./components/Login";
import ListEvent from "./components/ListEvent";
import AddEvent from "./components/AddEvent";
import Styles from "./utile/Styles";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import {ToastProvider} from "react-native-fast-toast";
import NavigationPrincipal from "./components/NavigationPrincipal";

const Stack = createNativeStackNavigator();

 const App=()=> {

     const store= configureStore();

  return (
      <Provider store={store}>
          <ToastProvider>
              <NavigationContainer>
                  <Stack.Navigator
                      screenOptions={{
                          headerStyle: {
                              backgroundColor: '#f4511e',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}>
                      <Stack.Screen
                          name="Login"
                          component={Login}
                          options={{ title: 'Login' }}
                      />
                      <Stack.Screen
                          name="NavigationPrincipal"
                          component={NavigationPrincipal}
                      />
                  </Stack.Navigator>
              </NavigationContainer>
          </ToastProvider>
      </Provider>
  );
}




export default App;

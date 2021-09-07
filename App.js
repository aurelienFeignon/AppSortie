import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./components/Login";
import ListEvent from "./components/ListEvent";
import Styles from "./utile/Styles";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import {ToastProvider} from "react-native-fast-toast";

const Stack = createNativeStackNavigator();

 const App=()=> {

     const store= configureStore();

  return (
      <Provider store={store}>
          <ToastProvider>
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen
                          name="Login"
                          component={Login}
                          options={{ title: 'Login' }}
                      />
                      <Stack.Screen name="ListEvent" component={ListEvent} />
                  </Stack.Navigator>
              </NavigationContainer>
          </ToastProvider>
      </Provider>
  );
}




export default App;

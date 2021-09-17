import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./components/Login";
import configureStore from "./store/configureStore";
import {connect, Provider} from "react-redux";
import {ToastProvider} from "react-native-fast-toast";
import NavigationPrincipal from "./components/NavigationPrincipal";
import * as SecureStore from 'expo-secure-store';
import Axios from "axios";


const Stack = createNativeStackNavigator();

 const App=(props) => {

     const store = configureStore();
     const state= store.getState();
     const axios= Axios.create({
         baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

     });

     useEffect(()=>{
         let userToken;
         SecureStore.getItemAsync('userToken').then(r=>{
             userToken=r;
             if (userToken){
                axios.post('participant/recoverUserWithApiToken',JSON.stringify({apiToken:userToken}))
                    .then(r=>{
                        state.login.user = r.data;
                        state.login.userToken= r.data.apiToken;
                        state.login.isSignout= false;
                        console.log(state);
                    })
             }
         });
     },[]);



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
                         {state.login.isSignout ?(
                         <Stack.Screen
                             name="Login"
                             component={Login}
                             options={{title: 'Login'}}
                         />) : (
                         <Stack.Screen
                             name="NavigationPrincipal"
                             component={NavigationPrincipal}
                         />)}
                     </Stack.Navigator>
                 </NavigationContainer>
             </ToastProvider>
         </Provider>
     );
 }



export default App;

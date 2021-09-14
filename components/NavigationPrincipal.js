import React, {useEffect} from "react";
import {} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ListEvent from "./ListEvent";
import AddEvent from "./AddEvent";
import {useBackHandler} from "@react-native-community/hooks";
import { CommonActions } from '@react-navigation/native';

const stack = createNativeStackNavigator();





const NavigationPrincipal= (props)=>{

    useBackHandler(() => {
        return true;
    })

        return(
            <stack.Navigator screenOptions={{
                headerShown: false,
                headerBackVisible:false}} >
                <stack.Screen name="ListEvent" component={ListEvent}
                 options={{headerBackVisible:false,
                            headerShown:false}}/>
                <stack.Screen name="AddEvent" component={AddEvent} />
            </stack.Navigator>
        );
    }




export default NavigationPrincipal;

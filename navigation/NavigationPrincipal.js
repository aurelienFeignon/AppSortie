import React, {useEffect} from "react";
import {} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ListEventScreen from "../screen/ListEventScreen";
import AddEventScreen from "../screen/AddEventScreen";
import {useBackHandler} from "@react-native-community/hooks";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogoutScreen from "../screen/LogoutScreen";

const stack = createNativeStackNavigator();
const Drawer= createDrawerNavigator();




const NavigationPrincipal= (props)=>{

    useBackHandler(() => {
        return true;
    })



        return(
                <Drawer.Navigator initialRouteName={"ListEventScreen"}>
                    <Drawer.Screen name="ListEvent" component={ListEventScreen}
                     options={{headerBackVisible:false,
                                headerShown:false}}/>
                    <Drawer.Screen name="AddEvent" component={AddEventScreen} />
                    <Drawer.Screen name="LogoutScreen" component={LogoutScreen} />
                </Drawer.Navigator>

        );
    }




export default NavigationPrincipal;

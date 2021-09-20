import React, {useEffect} from "react";
import {} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ListEvent from "./ListEvent";
import AddEvent from "./AddEvent";
import {useBackHandler} from "@react-native-community/hooks";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Logout from "./Logout";

const stack = createNativeStackNavigator();
const Drawer= createDrawerNavigator();




const NavigationPrincipal= (props)=>{

    useBackHandler(() => {
        return true;
    })



        return(
                <Drawer.Navigator initialRouteName={"ListEvent"}>
                    <Drawer.Screen name="ListEvent" component={ListEvent}
                     options={{headerBackVisible:false,
                                headerShown:false}}/>
                    <Drawer.Screen name="AddEvent" component={AddEvent} />
                    <Drawer.Screen name="Logout" component={Logout} />
                </Drawer.Navigator>

        );
    }




export default NavigationPrincipal;

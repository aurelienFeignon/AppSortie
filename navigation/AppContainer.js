import React, {useEffect, useState} from "react";
import {} from "react-native";
import LoginAction from "../store/actions/LoginAction";
import {bindActionCreators} from "redux";
import connect from "react-redux/lib/connect/connect";
import Axios from "axios";
import * as SecureStore from "expo-secure-store";
import LoginScreen from "../screen/LoginScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NavigationPrincipal from "./NavigationPrincipal";
import ForgotPassWordScreen from "../screen/ForgotPassWordScreen";
const Stack = createNativeStackNavigator();


const AppContainer= (props)=>{

    const {isSignout, user}= props;
    const [isLogin, setIsLogin]= useState(false);

    const axios= Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

    });

    useEffect(()=>{
        console.log('test', isSignout);
        let userToken;
        SecureStore.getItemAsync('userToken').then(r=>{
            userToken=r;
            console.log("userToken "+userToken)
            if (userToken){
                axios.post('participant/recoverUserWithApiToken',JSON.stringify({apiToken:userToken}))
                    .then(r=>{
                        LoginAction(r.data,r.data.apiToken);
                        console.log('test2 ' + props.isSignout);
                    })
            }
        });
    },[]);

    useEffect(()=>{
        console.log('testUseEffect ' +isSignout);
        isSignout? setIsLogin(false): setIsLogin(true);
    },[props.isSignout]);

    const options={
        headerBackVisible:false,
        headerShown:false
    }

    return(
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
                {!isLogin ?(
                    <Stack.Group>
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={options}
                        />
                        <Stack.Screen
                            name="ForgotPassWordScreen"
                            component={ForgotPassWordScreen}
                            options={options}
                        />
                    </Stack.Group>
                    ) : (
                    <Stack.Screen
                        name="NavigationPrincipal"
                        component={NavigationPrincipal}
                    />)}
            </Stack.Navigator>
        </NavigationContainer>
    )


}

const mapStateToProps= (state)=>{
    return {
        isSignout: state.isSignout,
        user: state.user,
    }
}

const ActionCreators = {
    LoginAction: LoginAction
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

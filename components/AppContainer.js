import React, {useEffect} from "react";
import {} from "react-native";
import LoginAction from "../actions/LoginAction";
import {bindActionCreators} from "redux";
import connect from "react-redux/lib/connect/connect";
import Axios from "axios";
import * as SecureStore from "expo-secure-store";
import Login from "./Login";
import NavigationPrincipal from "./NavigationPrincipal";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();


const AppContainer= (props)=>{

    let {isSignout, user}= props;

    const axios= Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

    });

    useEffect(()=>{
        console.log('test', isSignout);
        let userToken;
        SecureStore.getItemAsync('userToken').then(r=>{
            userToken=r;
            if (userToken){
                axios.post('participant/recoverUserWithApiToken',JSON.stringify({apiToken:userToken}))
                    .then(r=>{
                        LoginAction(r.data,r.data.apiToken);
                        console.log('test2' + isSignout)
                    })
            }
        });
    },[isSignout]);

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
                {isSignout ?(
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
    )


}

const mapStateToProps= (state)=>{
    return {
        isSignout: state.login.isLoading,
        user: state.login.isLoading,
    }
}

const ActionCreators = {
    LoginAction: LoginAction
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

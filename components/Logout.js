import React from 'react';
import {Button, Text, View} from 'react-native'
import Styles from "../utile/Styles";
import {bindActionCreators} from "redux";
import LogoutAction from "../actions/LogoutAction";
import connect from "react-redux/lib/connect/connect";
import * as SecureStore from 'expo-secure-store';

const Logout= (props)=>{

    const {actions, isSignout, user}= props;


    const onPressLogout=()=>{
        actions.LogoutAction();
        SecureStore.setItemAsync('userToken', '')
    }

    return (
        <View style={Styles.container}>
            <Text style={{fontSize:25}}>Are you sure to want logout?
            </Text>
            <Button title={'Logout'} onPress={onPressLogout}/>

        </View>
    )

}

const mapStateToProps = (state) => ({
    user: state.user,
    isSignout: state.isSignout,
});

const ActionCreators = {
    LogoutAction: LogoutAction
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Logout);

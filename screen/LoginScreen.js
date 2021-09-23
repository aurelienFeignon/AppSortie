import React, {useState, useEffect} from "react";
import {View, TextInput, Button, Image, Dimensions} from "react-native";
import Styles from "../utile/Styles";
import Axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {useToast} from "react-native-fast-toast";
import * as SecureStore from 'expo-secure-store';
import LoginAction from "../store/actions/LoginAction";



const LoginScreen=(props)=>{
    const toast = useToast()
    const [email, onChangeEmail]= useState('');
    const [mdp, onChangeMdp]= useState('');
    const [validEmail, isValidEmail]= useState(true);
    const [inputStyle, setInputStyle]= useState(Styles.validInput);
    const [disabled, isDisabled]= useState(true);
    const {width, height}= Dimensions.get('window');

    const regexEmail=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const axios= Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

    });

    useEffect(()=>{
        validEmail? setInputStyle(Styles.validInput): setInputStyle(Styles.invalidInput);
        if(validEmail && mdp === ''){
            isDisabled(true)
        }else isDisabled(false);
    },[validEmail, disabled, mdp]);

    const onBlurMail=()=>{
        if (regexEmail.test(email)){
            isValidEmail(true);
        }else {
            isValidEmail(false);
            toast.show('Enter a correct Email',{
                type:"danger",
                position:'top',
                duration: 4000,
                offset: 30,
                animationType:'slide-in'
            });

        }
    }



    const onClickButton=()=>{
        console.log(email);
        console.log(mdp)
        axios.post('login/participant',
            JSON.stringify({email:email, password:mdp}))
            .then((response)=>{
                if(response.status===200) {
                    let user = response.data;
                    props.actions.LoginAction(user,user.apiToken);
                    SecureStore.setItemAsync('userToken',user.apiToken).then();
                }
            })
            .catch(error=>{
                toast.show('The email or password is incorrect', {
                    type:"warning",
                    position:'top',
                    duration: 4000,
                    offset: 30,
                    animationType:'slide-in'
                });
                console.log(error)
            });
    }

    return(
        <View style={{flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            }}>
                <View style={{  width: width*0.7,
                                height:height*0.3,
                                marginTop:height*0.10,
                                marginBottom:height*0.1
                    }}>
                    <Image  source={require('../assets/logo-getout.png')}
                            style={{    width: "100%",
                                        height: "100%",
                                        resizeMode:"contain"}}/>
                </View>
                <View style={{  position:"absolute",
                                bottom:20,
                                display:"flex",
                                justifyContent:"space-between",
                                height:height*0.4

                            }}>
                    <TextInput
                    style={inputStyle}
                    onChangeText={text=>onChangeEmail(text)}
                    onBlur={onBlurMail}
                    value={email}
                    placeholder="Your Email"
                    keyboardType="email-address"
                    />
                    <TextInput
                    style={Styles.validInput}
                    onChangeText={text=>onChangeMdp(text)}
                    value={mdp}
                    placeholder="Your Password"
                    secureTextEntry={true}
                    />
                    <Button
                    title="LoginScreen"
                    onPress={onClickButton}
                    disabled={disabled}
                    />
                </View>
                <View style={{  position:"absolute",
                                height:height*0.6,
                                bottom:0,
                                zIndex:-1}}>
                    <Image source={require('../assets/backgroundLogin.png')}
                           style={{ height:'100%',
                                    resizeMode:"contain"
                           }}/>
                </View>
        </View>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    isSignout: state.isSignout,
});

const ActionCreators = {
    LoginAction: LoginAction
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)



import React, {useState, useEffect, useRef} from "react";
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    Text,
    SafeAreaView, StatusBar, Keyboard
} from "react-native";
import Styles from "../utile/Styles";
import Axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {useToast} from "react-native-fast-toast";
import * as SecureStore from 'expo-secure-store';
import LoginAction from "../store/actions/LoginAction";
import {InputOutline} from "react-native-input-outline";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from "../utile/Color";
import Svg, {Path} from "react-native-svg";



const LoginScreen=(props)=>{
    const toast = useToast()
    const [email, onChangeEmail]= useState('');
    const [mdp, onChangeMdp]= useState('');
    const [validEmail, isValidEmail]= useState(false);
    const [disabled, isDisabled]= useState(true);
    const {width, height}= Dimensions.get('window');
    const inputMail= useRef(null);
    const [errorMail, setErrorMail]=useState(undefined);

    const regexEmail=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const iconMail= <Icon name={'person'} size={20} color={"#000000"}/>;
    const iconMdp= <Icon name={'lock'} size={20} color={"#000000"}/>;
    const axios= Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

    });

    useEffect(()=>{
        const openKeyboard= Keyboard.addListener("keyboardWillShow", () => {
            console.log("Keyboard Shown");
        });
        const closeKeyboard= Keyboard.addListener("keyboardDidHide", () => {
            console.log("Keyboard hide");
        });

        return ()=>{
            openKeyboard.remove();
            closeKeyboard.remove();
        }
    },[]);

    useEffect(()=>{
        if(!validEmail && mdp === ''){
            isDisabled(true)
        }else isDisabled(false);
    },[validEmail, disabled, mdp]);



    const onBlurMail=()=>{
        if (regexEmail.test(email)){
            isValidEmail(true);
            setErrorMail(undefined);
        }else {
            isValidEmail(false);
            setErrorMail("Enter a correct Email");
        }
    }

    const onClickButtonLogin=()=>{
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

    const onClickButtonForgetPassword=()=>{

    }

    const styles=StyleSheet.create({
        buttonSubmit:{
            width:'100%',
            marginTop: 10,
            paddingVertical:15,
            borderRadius: 50,
            borderWidth: 2,
        },
        buttonEnable:{
            backgroundColor: Color.yellow,
            borderColor: Color.nightBlue,
        },
        buttonDisable:{
            backgroundColor:Color.nightBlue,
            borderColor: Color.yellow,
        },
        buttonSubmitText:{
            textAlign: 'center',
            fontSize:20,
            fontWeight:"bold",
            textTransform:"uppercase"
        },
        buttonSubmitTextDisable:{
            color: Color.yellow,
        },
        buttonSubmitTextEnable:{
            color: Color.nightBlue
        },
        containerForm:{
            position:"absolute",
            bottom:20,
            display:"flex",
            justifyContent:"flex-start",
            height:height*0.4,
            width:'80%',
            marginBottom: 5
        },
        containerImgBackground:{
            position:"absolute",
            height:height*0.6,
            width:'100%',
            bottom:0,
            zIndex:-1,
        },
        containerLogo:{
            width: width*0.7,
            height:height*0.3,
            marginTop:height*0.03,
            marginBottom:height*0.1

        },
        containerScreen:{
            flex: 1,
            backgroundColor: Color.nightBlue,
            alignItems: 'center',
        },
        imgResponsive:{
            width: "100%",
            height: "100%",
            resizeMode:"contain"
        },
        input:{
            marginVertical:10,
        },
    })


    return(

        <SafeAreaView style={styles.containerScreen}>
                <StatusBar
                backgroundColor="#fff"
                barStyle="dark-content"/>
                <View style={styles.containerLogo}>
                    <Image  source={require('../assets/logogetoutapp.png')}
                            style={styles.imgResponsive}/>
                </View>
                <View style={styles.containerForm}>
                    <InputOutline
                        ref={inputMail}
                        error={errorMail}
                        onChangeText={text=>onChangeEmail(text)}
                        value={email}
                        placeholder="Your Email"
                        keyboardType="email-address"
                        onEndEditing={onBlurMail}
                        trailingIcon={()=>iconMail}
                        style={styles.input}
                    />
                    <InputOutline
                        onChangeText={text=>onChangeMdp(text)}
                        value={mdp}
                        placeholder="Your Password"
                        secureTextEntry={true}
                        trailingIcon={()=>iconMdp}
                        style={styles.input}
                    />
                    <View>
                    <TouchableHighlight
                        onPress={onClickButtonLogin}
                        disabled={disabled}
                        style={[styles.buttonSubmit, disabled? styles.buttonDisable: styles.buttonEnable]}>
                        <Text style={[styles.buttonSubmitText, disabled? styles.buttonSubmitTextDisable: styles.buttonSubmitTextEnable]}>Login</Text>
                    </TouchableHighlight>
                        <TouchableHighlight
                            onPress={onClickButtonForgetPassword}
                            disabled={disabled}
                            style={[styles.buttonSubmit,  styles.buttonEnable]}>
                            <Text style={[styles.buttonSubmitText, styles.buttonSubmitTextEnable]}>Forgot Password ?</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                {/*<View>*/}
                <View style={styles.containerImgBackground}>
                    <Svg height="100%" width="100%" preserveAspectRatio="none  xMinYMin xMaxYMax meet"  viewBox="100 0 1000 1252.18">
                        <Path fill={Color.blueGrey}
                              d="M1125,383.64v868.54H0V43.76C290.36-30.58,612.32-32.4,807,217.05,895.89,330.94,1006.21,378.9,1125,383.64Z"/>
                    </Svg>
                </View>
        </SafeAreaView>
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



import React, {useState, useEffect, useRef} from "react";
import {
    View,
    Image,
    Dimensions,
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
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import Logo from "../components/Logo";



const LoginScreen=(props)=>{
    const toast = useToast()
    const [email, onChangeEmail]= useState('');
    const [mdp, onChangeMdp]= useState('');
    const [validEmail, isValidEmail]= useState(false);
    const [disabled, isDisabled]= useState(true);
    const {width, height}= Dimensions.get('window');
    const inputMail= useRef(null);
    const [errorMail, setErrorMail]=useState(undefined);
    const styles= Styles(height,width);
    const regexEmail=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const iconMail= <Icon name={'person'} size={20} color={"#000000"}/>;
    const iconMdp= <Icon name={'lock'} size={20} color={"#000000"}/>;
    const axios= Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

    });
    const positionLogo= useSharedValue(0);
    const positionForm= useSharedValue(0)
    const sizeLogo= useSharedValue(1);

    const animatedLogo= useAnimatedStyle(()=>{
        return{
            transform:[{translateY: positionLogo.value,
            },{scale: sizeLogo.value}],
        };
    });
    const animatedForm= useAnimatedStyle(()=>{
        return{
            transform:[{translateY: positionForm.value}]
        }
    });

    useEffect(()=>{
        const openKeyboard= Keyboard.addListener("keyboardDidShow", () => {
            positionLogo.value= withSpring(-75);
            positionForm.value= withSpring(-165);
            sizeLogo.value=withSpring(0.69);
        });
        const closeKeyboard= Keyboard.addListener("keyboardDidHide", () => {
            positionLogo.value=withSpring(0);
            positionForm.value=withSpring(0);
            sizeLogo.value=withSpring(1);
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

    const onClickButtonSignUp=()=>{

    }

    const onPressForgot=()=> {
        console.log('press')
    }

    return(

        <SafeAreaView style={styles.containerScreen}>
                <StatusBar
                backgroundColor="#fff"
                barStyle="dark-content"/>
                <Animated.View style={[styles.containerLogo, animatedLogo]}>
                    <Logo/>
                </Animated.View>
                <Animated.View style={[styles.containerForm, animatedForm]}>
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
                    <Text   onPress={onPressForgot}
                            style={styles.textForgotPassword}>
                        Forgot password?
                    </Text>
                    <View>
                    <TouchableHighlight
                        onPress={onClickButtonLogin}
                        disabled={disabled}
                        style={[styles.buttonSubmit, disabled? styles.buttonDisable: styles.buttonEnable]}>
                        <Text style={[styles.buttonSubmitText, disabled? styles.buttonSubmitTextDisable: styles.buttonSubmitTextEnable]}>Login</Text>
                    </TouchableHighlight>
                        <TouchableHighlight
                            onPress={onClickButtonSignUp}
                            disabled={disabled}
                            style={[styles.buttonSubmit,  styles.buttonEnable]}>
                            <Text style={[styles.buttonSubmitText, styles.buttonSubmitTextEnable]}>Sign up</Text>
                        </TouchableHighlight>
                    </View>
                </Animated.View>
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



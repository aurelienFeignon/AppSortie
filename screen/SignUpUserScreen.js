import React, {useRef, useState} from "react";
import {Dimensions, ScrollView, StatusBar, Text, TouchableHighlight, View} from "react-native";
import Logo from "../components/Logo";
import {InputOutline} from "react-native-input-outline";
import {iconMail} from "../utile/Icone";
import getStyle from "../utile/Styles";
import {regexEmail} from "../utile/Regex";
import InputPasswordConfirme from "../components/InputPasswordConfirme";
import Color from "../utile/Color";

const SignUpUserScreen= ()=>{
    const {width, height}= Dimensions.get('window');
    const styles= getStyle(width, height);
    const [email,setEmail]= useState('');
    const [validEmail,isValidEmail]= useState(false);
    const inputMail= useRef(null);
    const [errorMail, setErrorMail]=useState(undefined);
    const [samePassword, setSamePassword]= useState(false);
    const [errorSamePassword, setErrorSamePassword]= useState(undefined);
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');

    const onBlurMail=()=>{
        if (regexEmail.test(email)){
            isValidEmail(true);
            setErrorMail(undefined);
        }else {
            isValidEmail(false);
            setErrorMail("Enter a correct Email");
        }
    }

    const  onBlurConfirmMdp=()=>{
        if(password!==confirmPassword){
            setSamePassword(false);
            setErrorSamePassword("The 2 passwords don't match")
        }else{
            setSamePassword(true);
            setErrorSamePassword(undefined)
        }
    };

    return (
        <ScrollView contentContainerStyle={{alignItems:"center", backgroundColor:Color.nightBlue}}>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"/>
                <View style={[styles.containerLogo, styles.containerLogoForgot]}>
                    <Logo/>
                </View>
                <View style={{width:'80%'}}>
                    <Text style={[styles.textYellowBold, styles.fontSize23, styles.mv10]}>Sign up</Text>
                        <InputOutline
                            ref={inputMail}
                            error={errorMail}
                            onChangeText={text=>setEmail(text)}
                            value={email}
                            placeholder="Your Email"
                            keyboardType="email-address"
                            onEndEditing={onBlurMail}
                            trailingIcon={()=>iconMail}
                            style={styles.mv10}
                        />
                        <InputPasswordConfirme
                            onBlurConfirmMdp={onBlurConfirmMdp}
                            password={password}
                            confirmPassword={confirmPassword}
                            setPassword={setPassword}
                            setConfirmPassword={setConfirmPassword}
                            errorSamePassword={errorSamePassword}
                        />

                        <TouchableHighlight
                            // onPress={}
                            disabled={validEmail}
                            style={[styles.buttonSubmit, validEmail? styles.buttonEnable: styles.buttonDisable]}>
                            <Text style={[styles.buttonSubmitText, validEmail? styles.buttonSubmitTextEnable : styles.buttonSubmitTextDisable]}>
                                Sign up
                            </Text>
                        </TouchableHighlight>
                    </View>
        </ScrollView>


    )


}

export default SignUpUserScreen;

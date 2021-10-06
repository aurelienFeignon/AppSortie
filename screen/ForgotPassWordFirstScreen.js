import {Dimensions, SafeAreaView, ScrollView, StatusBar, Text, TouchableHighlight, View} from 'react-native';
import getStyle from "../utile/Styles";
import React, {useRef, useState} from "react";
import Logo from "../components/Logo";
import {InputOutline} from "react-native-input-outline";
import {iconMail} from "../utile/Icone";
import {regexEmail} from "../utile/Regex";
import getAxios from "../utile/GetAxios";
import {bindActionCreators} from "redux";
import ResetPasswordAction from "../store/actions/ResetPasswordAction";
import {connect} from "react-redux";
import {useToast} from "react-native-fast-toast";
import Color from "../utile/Color";

const ForgotPassWordFirstScreen=(props)=>{
    const toast = useToast()
    const {width, height}= Dimensions.get('window');
    const styles= getStyle(width, height);
    const [email,setEmail]= useState('');
    const [validEmail,isValidEmail]= useState(false);
    const inputMail= useRef(null);
    const [errorMail, setErrorMail]=useState(undefined);
    const axios= getAxios();

    const onClickReset=()=>{
        //todo deployer les nouvelles routes de l'api
        // axios.post('participant/reset/password/first/step',JSON.stringify({email:email}))
        //     .then((response)=>{
        //        if (response.status ===200){
        //            const resetNumber= response.data;
        //             props.actions.ResetPasswordAction(email, resetNumber);
        //             props.navigation.navigate('ForgotPassWordSecondScreen');
        //        }
        //     })
        //     .catch((reason => {
        //         toast.show(reason.error, {
        //             type:"warning",
        //             position:'top',
        //             duration: 4000,
        //             offset: 30,
        //             animationType:'slide-in'
        //         });
        //     }))
        console.log('test');
        const resetNumber="31709448";
        props.actions.ResetPasswordAction(email, resetNumber);
        props.navigation.navigate('ForgotPassWordSecondScreen');
    }

    const onBlurMail=()=>{
        if (regexEmail.test(email)){
            isValidEmail(true);
            setErrorMail(undefined);
        }else {
            isValidEmail(false);
            setErrorMail("Enter a correct Email");
        }
    }

    return (
        <ScrollView contentContainerStyle={{alignItems:"center", backgroundColor:Color.nightBlue, minHeight:height}}>
            <StatusBar
                backgroundColor="#fff"
                barStyle="dark-content"/>
            <View style={[styles.containerLogo, styles.containerLogoForgot]}>
                <Logo/>
            </View>
            <View style={{width:'80%'}}>
                <Text style={[styles.textYellowBold, styles.fontSize23, styles.mv10]}>Forgot password?</Text>
                <Text style={[styles.textYellowBold, styles.fontSize18, styles.mv10]}>Please enter your registered email ID.</Text>
                <Text style={[styles.buttonSubmitTextEnable, styles.mv10]}>We will send a verification code to your registered email ID.</Text>
                <View style={styles.mt15}>
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
                    <TouchableHighlight
                        onPress={onClickReset}
                        disabled={!validEmail}
                        style={[styles.buttonSubmit, validEmail? styles.buttonEnable: styles.buttonDisable]}>
                        <Text style={[styles.buttonSubmitText, validEmail? styles.buttonSubmitTextEnable : styles.buttonSubmitTextDisable]}>
                            Reset password
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>

    )

}

const ActionCreators = {
    ResetPasswordAction: ResetPasswordAction
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(ForgotPassWordFirstScreen);

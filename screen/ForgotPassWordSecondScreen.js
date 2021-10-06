import {Dimensions, SafeAreaView, StatusBar, Text, TouchableHighlight, View} from 'react-native';
import getStyle from "../utile/Styles";
import React, {useEffect, useRef, useState} from "react";
import Logo from "../components/Logo";
import {InputOutline} from "react-native-input-outline";
import {iconCode} from "../utile/Icone";
import {regexEmail} from "../utile/Regex";
import getAxios from "../utile/GetAxios";
import {connect} from "react-redux";
import {useToast} from "react-native-fast-toast";
import NumberPadResetCode from "../components/NumberPadResetCode";

const ForgotPassWordSecondScreen=(props)=>{
    const {width, height}= Dimensions.get('window');
    const styles= getStyle(width, height);
    const [resetCode,setResetCode]= useState('');
    const [errorCode, setErrorMail]=useState(undefined);
    const [padsNumber, setPadsNumber]= useState(null);


    useEffect(()=>{
        let number=[0,1,2,3,4,5,6,7,8,9];
        let  nValue= number.length;
        let tabNumber=[];
        for(let i =0; i<nValue; i++){
            let n= Math.floor(Math.random() * (number.length));
            let value= number[n];
            tabNumber.push(value);
            number.splice(n,1);
        }
        console.log(tabNumber);
        setPadsNumber(tabNumber.map((value, index) =>{
            return <NumberPadResetCode
                key={index}
                number={value}
                onPress={onPressPad}
            />
        } ))
    },[]);

    useEffect(()=>{
        if (resetCode.length===8){
            if (resetCode===props.resetCode){
                console.log('nice change screen');
                //todo changement de screen et le else!
            }
        }
    },[resetCode])

    const onPressPad=(n)=>{
    setResetCode((prevState => prevState+n.toString()))
    }


    return (
        <SafeAreaView style={[styles.containerScreen]}>
            <StatusBar
                backgroundColor="#fff"
                barStyle="dark-content"/>
            <View style={[styles.containerLogo, styles.containerLogoForgot]}>
                <Logo/>
            </View>
            <View style={{width:'80%'}}>
                <Text style={[styles.textYellowBold, styles.fontSize23, styles.mv10]}>Forgot password?</Text>
                <Text style={[styles.textYellowBold, styles.fontSize18, styles.mv10]}>Please enter your verification code send on your email</Text>
                <View style={styles.mt15}>
                   <View style={{display:"flex", flexDirection:"row", flexWrap: "wrap", alignItems:"center", justifyContent:"center"}}>
                       {padsNumber}
                   </View>

                    <InputOutline
                        // error={errorMail}
                        editable={false}
                        showSoftInputOnFocus={false}
                        value={resetCode}
                        placeholder="Your reset code"
                        trailingIcon={()=>iconCode}
                        style={styles.mv10}
                        />
                </View>
            </View>
        </SafeAreaView>

    )

}

const mapStateToProps = state => ({
    resetCode: state.codeReset,
});


export default connect(mapStateToProps)(ForgotPassWordSecondScreen);

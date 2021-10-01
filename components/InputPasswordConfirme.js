import React, {useEffect, useRef, useState} from "react";
import {View} from "react-native";
import {InputOutline} from "react-native-input-outline";
import getStyle from "../utile/Styles";
import {iconVisibility} from "../utile/Icone";
import Icon from "react-native-vector-icons/MaterialIcons";

const InputPasswordConfirme= (props)=>{
    const inputPassword= useRef(null);
    const inputConfirmPassword= useRef(null);
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [invisiblePassword, setInvisiblePassword]= useState(true);
    const [invisibleConfirmPassword, setInvisibleConfimPassword]= useState(true);
    const [samePassword, setSamePassword]= useState(false);
    const [errorSamePassword, setErrorSamePassword]= useState(undefined);
    const styles= getStyle();

    const onBlurMdp=()=>{
    //todo verif regex password
    };

    const onPressIconPassword=()=>{
    invisiblePassword? setInvisiblePassword(false): setInvisiblePassword(true);
    }

    const onPressIconConfirmPassword=()=>{
        invisibleConfirmPassword? setInvisibleConfimPassword(false): setInvisibleConfimPassword(true);
    }

    const gestureIcon=()=>{
         return invisiblePassword? <Icon name={'visibility-off'} size={20} color={"#000000"} onPress={onPressIconPassword} />
            : <Icon name={'visibility'} size={20} color={"#000000"} onPress={onPressIconPassword} />;
    };

    const gestureIconConfir=()=>{
        return invisibleConfirmPassword? <Icon name={'visibility-off'} size={20} color={"#000000"} onPress={onPressIconConfirmPassword} />
            : <Icon name={'visibility'} size={20} color={"#000000"} onPress={onPressIconConfirmPassword} />;
    };

    const  onBlurConfirmMdp=()=>{
        if(password!==confirmPassword){
            setSamePassword(false);
            setErrorSamePassword("The 2 passwords don't match")
        }else{
            setSamePassword(true);
            setErrorSamePassword(undefined)
        }
    };


    return(
        <View>
            <InputOutline
                ref={inputPassword}
                onChangeText={text=>setPassword(text)}
                value={password}
                placeholder="Your password"
                onEndEditing={onBlurMdp}
                style={styles.mv10}
                secureTextEntry={invisiblePassword}
                trailingIcon={gestureIcon}
            />
            <InputOutline
                ref={inputConfirmPassword}
                onChangeText={text=>setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="Confirm your password"
                onEndEditing={onBlurConfirmMdp}
                style={styles.mv10}
                secureTextEntry={invisibleConfirmPassword}
                trailingIcon={gestureIconConfir}
                error={errorSamePassword}
            />
        </View>
    )

}

export default InputPasswordConfirme;

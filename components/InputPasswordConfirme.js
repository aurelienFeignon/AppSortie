import React, {useEffect, useRef, useState} from "react";
import {View} from "react-native";
import {InputOutline} from "react-native-input-outline";
import getStyle from "../utile/Styles";
import {iconVisibility} from "../utile/Icone";
import Icon from "react-native-vector-icons/MaterialIcons";

const InputPasswordConfirme= (props)=>{
    const inputPassword= useRef(null);
    const inputConfirmPassword= useRef(null);
    const [invisiblePassword, setInvisiblePassword]= useState(true);
    const [invisibleConfirmPassword, setInvisibleConfimPassword]= useState(true);
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

    const gestureIconConfirm=()=>{
        return invisibleConfirmPassword? <Icon name={'visibility-off'} size={20} color={"#000000"} onPress={onPressIconConfirmPassword} />
            : <Icon name={'visibility'} size={20} color={"#000000"} onPress={onPressIconConfirmPassword} />;
    };


    return(
        <View>
            <InputOutline
                ref={inputPassword}
                onChangeText={text=>props.setPassword(text)}
                value={props.password}
                placeholder="Your password"
                onEndEditing={onBlurMdp}
                style={styles.mv10}
                secureTextEntry={invisiblePassword}
                trailingIcon={gestureIcon}
            />
            <InputOutline
                ref={inputConfirmPassword}
                onChangeText={text=>props.setConfirmPassword(text)}
                value={props.confirmPassword}
                placeholder="Confirm your password"
                onEndEditing={props.onBlurConfirmMdp}
                style={styles.mv10}
                secureTextEntry={invisibleConfirmPassword}
                trailingIcon={gestureIconConfirm}
                error={props.errorSamePassword}
            />
        </View>
    )

}

export default InputPasswordConfirme;

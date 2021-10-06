import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import Color from "../utile/Color";
import getStyle from "../utile/Styles";

const NumberPadResetCode= (props)=>{
    const {width, height}= Dimensions.get('window');
    const styles= getStyle(height, width);


    return(
        <TouchableOpacity  style={{
            width: width*0.15,
            height:width*0.15,
            backgroundColor:Color.blueGrey,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:15,
            marginVertical:5,
            marginHorizontal:1
            }}
            onPress={()=>props.onPress(props.number)}>
            <Text style={[styles.textYellowBold, {fontSize:20}]}>{props.number} </Text>
        </TouchableOpacity>
    )
}

export default NumberPadResetCode;

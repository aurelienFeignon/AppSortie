import react from 'react';
import {Image} from 'react-native';
import getStyle from "../utile/Styles";
import React from "react";

const Logo=()=>{
    const styles= getStyle();
    return(
        <Image  source={require('../assets/logogetoutapp.png')}
                style={styles.imgResponsive}/>
    );
}

export default Logo;

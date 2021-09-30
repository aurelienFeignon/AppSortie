import react from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import getStyle from "../utile/Styles";

const ForgotPassWordScreen=()=>{
    const {width, height}= Dimensions.get('window');
    const styles= getStyle(width, height);

    return (
        <SafeAreaView style={styles.containerScreen}>

        </SafeAreaView>

    )

}

export default ForgotPassWordScreen;

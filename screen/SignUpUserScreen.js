import React, {useEffect, useRef, useState} from "react";
import {Button, Dimensions, Image, ScrollView, StatusBar, Text, TouchableHighlight, View} from "react-native";
import Logo from "../components/Logo";
import {InputOutline} from "react-native-input-outline";
import {iconCivilite, iconDelete, iconMail, iconUsername} from "../utile/Icone";
import getStyle from "../utile/Styles";
import {regexEmail} from "../utile/Regex";
import InputPasswordConfirme from "../components/InputPasswordConfirme";
import Color from "../utile/Color";
import {Picker} from '@react-native-picker/picker';
import getAxios from "../utile/GetAxios";
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/MaterialIcons";

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
    const [lastName,setLastName]= useState('');
    const [firstName,setFirstName]= useState('');
    const [userName,setUserName]= useState('');
    const [selectedCampus, setSelectedCampus]= useState();
    const [pikerItem, setPikerItem]= useState();
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [disabled, setDisabled]= useState(true);
    const axios= getAxios();


    useEffect(()=> {
        axios.get('campus')
            .then((r) => {
                setPikerItem(r.data.map((campus) => {
                    return <Picker.Item key={campus.id} label={campus.nom} value={campus.id} style={{paddingVertical:10}}/>
                }))
            });


    });

    useEffect(()=>{
        console.log("testUSeEffect")
       if(!validEmail || !samePassword || lastName.trim()==="" || firstName.trim()==="" || userName.trim()===""){
           setDisabled(true)
       }else setDisabled(false);
    },[email, password, confirmPassword, selectedCampus, firstName, lastName, userName]);

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

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: false,
            aspect: [4, 3],
        });
        if (pickerResult.cancelled === true) {
            return;
        }
        let tabUri= pickerResult.uri.split('.');
        let ext= tabUri[tabUri.length-1];
        let base64= `data:image/${ext};base64,${pickerResult.base64}`;

        setSelectedImage({
            localUri: pickerResult.uri,
            base64: base64});
    };

    const onPressDelete=()=>{
        setSelectedImage(null);
    }

    const signUp=()=>{
        const bodyRequest={
            nom:lastName,
            prenom:firstName,
            userName: userName,
            email:email,
            password:password,
            campus: selectedCampus,
        }
        if(selectedImage!==null){
            bodyRequest.image= {
                base64:selectedImage.base64
            }
        }

        axios.post("/register/participant", JSON.stringify(bodyRequest))
            .then((reponse)=>{
                console.log(reponse)
            })
            .catch(reason => console.log(reason))

    }

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
                        <InputOutline
                            placeholder="Last name"
                            style={styles.mv10}
                            value={lastName}
                            onChangeText={text=>setLastName(text)}
                            trailingIcon={()=>iconCivilite}
                        />
                        <InputOutline
                            placeholder="First name"
                            style={styles.mv10}
                            value={firstName}
                            onChangeText={text=>setFirstName(text)}
                            trailingIcon={()=>iconCivilite}
                        />
                        <InputOutline
                            placeholder="Username"
                            style={styles.mv10}
                            value={userName}
                            onChangeText={text=>setUserName(text)}
                            trailingIcon={()=>iconUsername}
                        />
                        <Text style={[styles.textYellowBold, styles.mv10]}>Choose your campus:</Text>
                    <Picker
                        selectedValue={selectedCampus}
                        onValueChange={((itemValue, itemIndex) => setSelectedCampus(itemValue))}
                        style={{backgroundColor:"#fff", marginVertical:10, paddingVertical:10}}
                    >
                        {pikerItem}
                    </Picker>
                    <View style={{display: "flex", alignItems:"center"}}>
                    <TouchableHighlight
                        style={{height:height*0.3,
                                width: height*0.3,
                                borderRadius: (height*0.3)/2,
                                borderColor:Color.yellow,
                                borderWidth:1,
                                overflow:"hidden"}}
                        onPress={openImagePickerAsync}>

                        {selectedImage=== null?(
                            <Image source={require("../assets/profile-picture-default.png")} style={{height:height*0.3, width: height*0.3}}/>
                        ):(
                            <>
                                <Image  source={{uri: selectedImage.localUri}}
                                        style={{height:height*0.3, width: height*0.3}}/>
                                <TouchableHighlight   style={styles.containerImgProfilDeleteIcon}
                                        onPress={onPressDelete}>
                                    {iconDelete}
                                </TouchableHighlight>
                            </>
                        )
                        }

                    </TouchableHighlight>
                    </View>
                        <TouchableHighlight
                            onPress={signUp}
                            // disabled={!disabled}
                            style={[styles.buttonSubmit, !disabled? styles.buttonEnable: styles.buttonDisable, styles.mv10]}>
                            <Text style={[styles.buttonSubmitText, !disabled? styles.buttonSubmitTextEnable : styles.buttonSubmitTextDisable]}>
                                Sign up
                            </Text>
                        </TouchableHighlight>
                    </View>
        </ScrollView>


    )


}


export default SignUpUserScreen;

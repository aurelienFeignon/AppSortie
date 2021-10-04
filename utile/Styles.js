import Color from "./Color";

export default function getStyle(height=0, width=0){
    return{
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        validInput:{
            height: 40,
            width:300,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor:"#fff"
        },
        invalidInput:{
            height: 40,
            width:300,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            backgroundColor: "#DC143C"
        },
        buttonSubmit:{
            width:'100%',
            marginVertical: 10,
            paddingVertical:10,
            borderRadius: 50,
            borderWidth: 2,
        },
        buttonEnable:{
            backgroundColor: Color.blueGrey,
            borderColor: Color.nightBlue,
        },
        buttonDisable:{
            backgroundColor:Color.nightBlue,
            borderColor: Color.yellow,
        },
        buttonSubmitText:{
            textAlign: 'center',
            fontSize:20,
            fontWeight:"bold",
            textTransform:"uppercase"
        },
        buttonSubmitTextDisable:{
            color: Color.yellow,
        },
        buttonSubmitTextEnable:{
            color: Color.yellow
        },
        containerImgProfilDeleteIcon:{
            backgroundColor:Color.yellow,
            position:"absolute",
            height:25,
            width:"100%",
            bottom:0,
            display:"flex",
            alignItems: "center",
            justifyContent:"center"
        },
        containerForm:{
            // position:"absolute",
            bottom:20,
            display:"flex",
            justifyContent:"flex-start",
            height:height*0.5,
            width:'80%',
            marginBottom: 5
        },
        containerImgBackground:{
            position:"absolute",
            height:height*0.6,
            width:'100%',
            bottom:0,
            zIndex:-1,
        },
        containerLogo:{
            width: width*0.7,
            marginTop:height*0.03,
            marginBottom:height*0.05

        },
        containerLogoLogin:{
            height:height*0.4,
        },
        containerLogoForgot:{
            height:height*0.7,
        },
        containerScreen:{
            flex: 1,
            backgroundColor: Color.nightBlue,
            alignItems: 'center',
        },
        fontSize18:{
            fontSize:18
        },
        fontSize23:{
            fontSize:23
        },
        imgResponsive:{
            width: "100%",
            height: "100%",
            resizeMode:"contain"
        },
        mt15:{
          marginTop: 15
        },
        mv10:{
            marginVertical:10,
        },
        textForgotPassword:{
            color: '#fff',
        },
        textYellowBold:{
            color: Color.yellow,
            fontWeight:"bold"
        },
    }
}

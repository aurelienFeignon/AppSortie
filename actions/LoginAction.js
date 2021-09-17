import {LOGIN} from "../constants/constante";

 const LoginAction= (user,userToken)=>{
    return {
        type: LOGIN,
        user:user,
        userToken:userToken,
    }
}

export default LoginAction;

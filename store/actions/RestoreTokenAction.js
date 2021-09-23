import {RESTORE_TOKEN} from "../constants/constante";

 const RestoreTokenAction= (user, userToken)=>{
    return {
        type: RESTORE_TOKEN,
        user:user,
        userToken:userToken
    }
}

export default LoginAction;

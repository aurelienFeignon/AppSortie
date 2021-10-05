import {RESET_PASSWORD} from "../constants/constante";

 const ResetPasswordAction= (email, codeReset)=>{
    return {
        type: RESET_PASSWORD,
        email:email,
        codeReset:codeReset
    }
}

export default ResetPasswordAction;

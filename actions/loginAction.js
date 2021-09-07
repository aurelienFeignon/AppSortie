import {LOGIN} from "../constants/constante";

 const loginAction= (user)=>{
    return {
        type: LOGIN,
        payload: user
    }
}

export default loginAction;

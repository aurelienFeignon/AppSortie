import {LOGIN, LOGOUT, RESET_PASSWORD, RESTORE_TOKEN} from "../constants/constante";

const initialState={
    user: null,
    isLoading:true,
    isSignout:true,
    userToken:null,
    email:null,
    codeReset:null
};

const loginReducer= (state= initialState, action)=>{
    switch (action.type){
        case LOGIN:
            return{
                ...state,
                user: action.user,
                userToken: action.userToken,
                isSignout: false,
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                userToken: null,
                isSignout: true
            }
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.userToken,
                isLoading: false
            }
        case RESET_PASSWORD:
            return {
                ...state,
                email: action.email,
                codeReset: action.codeReset
            }
        default:
            return state;
    }
}

export default loginReducer;

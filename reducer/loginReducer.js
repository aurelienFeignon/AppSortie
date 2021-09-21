import {LOGIN, LOGOUT, RESTORE_TOKEN} from "../constants/constante";

const initialState={
    user: null,
    isLoading:true,
    isSignout:true,
    userToken:null
};

const loginReducer= (state= initialState, action)=>{
    switch (action.type){
        case LOGIN:
            console.log("loginReducer "+JSON.stringify(state))
            let test= {
                ...state,
                user: action.user,
                userToken: action.userToken,
                isSignout: false,
            };
            console.log("loginReducer 2 "+JSON.stringify(test.isSignout));
            return test;
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
        default:
            return state;
    }
}

export default loginReducer;

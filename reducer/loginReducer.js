import {LOGIN} from "../constants/constante";

const initialState={
    user: null
};

const loginReducer= (state= initialState, action)=>{
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default loginReducer;

import { createStore, combineReducers } from 'redux';
import loginReducer from "../reducer/loginReducer";

const rootReducer= combineReducers(
    {login: loginReducer},
);

const configureStore=()=>{
    return createStore(rootReducer);
}

export default configureStore;

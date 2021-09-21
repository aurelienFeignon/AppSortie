import { createStore, applyMiddleware} from 'redux';
import loginReducer from "../reducer/loginReducer";
import logger from 'redux-logger';
import {} from "react-native";


const configureStore=()=>{
    return createStore(loginReducer, applyMiddleware(logger));
}

export default configureStore;

import React from 'react';
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import {ToastProvider} from "react-native-fast-toast";
import AppContainer from "./components/AppContainer";

 const App=() => {

     const store = configureStore();

     return (
         <Provider store={store}>
             <ToastProvider>
                <AppContainer/>
             </ToastProvider>
         </Provider>
     );
 }

export default App;

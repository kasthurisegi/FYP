import React, { createContext, useEffect, useState, useReducer, useContext, useRef } from "react";
import { auth } from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const UserInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {

    const [loginState, setLoginState] = useState(false)

    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setLoginState(true)
        // ...
    } else {
        // User is signed out
        // ...
        setLoginState(false)
    }
    });

    ////// Dispatch X-AXIS //////
    const INITIAL_X_AXIS = [];

    const xAxisReducer = (state, action) => {
        switch(action.type){
            case "CHANGE_X_AXIS":
                return action.payload
        };
    };

    const [xAxis, dispatchXAxis] = useReducer(xAxisReducer, INITIAL_X_AXIS);
    /////////////////////////////

    return (
        <UserInfoContext.Provider value={{
            loginState: loginState,
        }}>
            {children}
        </UserInfoContext.Provider>
    );

};
import React, { createContext, useEffect, useState, useReducer, useContext, useRef } from "react";
import { auth, db } from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const UserInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {

    const [loginState, setLoginState] = useState(false);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setLoginState(true)
                setUserID(uid)
        
            } else {
                // User is signed out
                // ...
                setLoginState(false)
            }
            });
    },[])

    return (
        <UserInfoContext.Provider value={{
            loginState: loginState,
            userID: userID
        }}>
            {children}
        </UserInfoContext.Provider>
    );

};
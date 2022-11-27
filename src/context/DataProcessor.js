
import React, { createContext, useEffect, useState, useReducer, useContext, useRef } from "react";
import { auth, db } from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { UserInfoContext } from "./userInfoContext";

export const DataProcessorContext = createContext();

export const DataProcessorContextProvider = ({ children }) => {

    const { userID } = useContext(UserInfoContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [roommate, setRoommate] = useState(null);
    const [room, setRoom] = useState(null);
    const [favorite, setFavorite] = useState(null);
    const [favoriteRoom, setFavoriteRoom] = useState(null);

    useEffect(() => {

        if(userID){
            const unsub = onSnapshot(doc(db, "users", userID), (doc) => {
                setCurrentUser(doc.data())
                return;
            });

            const q = query(collection(db, "favorite"), where("userID", "==", userID));
            const unsubscribeFavorite = onSnapshot(q, (querySnapshot) => {
            const favorites = [];
            querySnapshot.forEach((doc) => {
                favorites.push(doc.data());
            });
            setFavorite(favorites)
            });

            const q1 = query(collection(db, "favoriteRoom"), where("userID", "==", userID));
            const unsubscribeRoomFavorite = onSnapshot(q1, (querySnapshot) => {
            const favoritesRoom = [];
            querySnapshot.forEach((doc) => {
                favoritesRoom.push(doc.data());
            });
            setFavoriteRoom(favoritesRoom)
            });

            return () => {
                unsub,
                unsubscribeFavorite,
                unsubscribeRoomFavorite
            }
        }

    },[userID]);

    useEffect(() => {

        const q = query(collection(db, "roommates"), where("roommateID", "!=", ""));
        const unsubscribeRoommate = onSnapshot(q, (querySnapshot) => {
        const roommates = [];
        querySnapshot.forEach((doc) => {
            roommates.push(doc.data());
        });
        setRoommate(roommates)
        });

        const q1 = query(collection(db, "room"), where("roomID", "!=", ""));
        const unsubscribeRoom = onSnapshot(q1, (querySnapshot) => {
        const room = [];
        querySnapshot.forEach((doc) => {
            room.push(doc.data());
        });
        setRoom(room)
        });

        return () => {
            unsubscribeRoommate,
            unsubscribeRoom
        }

    },[]);

    const INITIAL_SELECTED_ROOMMATE = null;

    const selectRoommateReducer = (state, action) => {
        switch(action.type){
            case "CHANGE_ROOMMATE":
                return action.payload
        };
    };

    const [selectedRoommate, dispatchSelectRoommate] = useReducer(selectRoommateReducer, INITIAL_SELECTED_ROOMMATE);

    const INITIAL_SELECTED_ROOM = null;

    const selectRoomReducer = (state, action) => {
        switch(action.type){
            case "CHANGE_ROOM":
                return action.payload
        };
    };

    const [selectedRoom, dispatchSelectRoom] = useReducer(selectRoomReducer, INITIAL_SELECTED_ROOM);

    return (
        <DataProcessorContext.Provider value={{
            currentUser: currentUser,
            roommate: roommate,
            selectedRoommate: selectedRoommate,
            dispatchSelectRoommate,
            favorite: favorite,
            room: room,
            selectedRoom: selectedRoom,
            dispatchSelectRoom,
            favoriteRoom: favoriteRoom
        }}>
            {children}
        </DataProcessorContext.Provider>
    );

};
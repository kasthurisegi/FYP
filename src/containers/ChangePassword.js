import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from '../../FirebaseConfig';

const ChangePassword = () => {

    const [email, setemail] = useState("");
    const [errMessage, setErrMessage] = useState("");
    
    
    //////////// Change password ////////////
    const changePassword =()=>{
        if(email!=null)
        {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent')
            // ..
        })
        .catch((error) => {
            const errormsg = error.message;
            const msgone = errormsg.replace('Firebase: Error', '')
            const msgtwo = msgone.replace('(auth/', '')
            const msgthree = msgtwo.replace(').', '')
            const newErrmsg = msgthree.replace('-', ' ')
            setErrMessage(newErrmsg)
        });
        }
        else
        {
            alert('Please enter a valid email')
        }
    }

  return (
    <View>
    <View style={{paddingTop: "30px", alignItems: 'center'}}>
        <Text style={{paddingVertical: 5, alignItems: 'center'}}>Please enter your email.</Text>
        <TextInput style={styles.textInput} onChangeText={setemail}></TextInput>
        {errMessage !== "" && <Text>{errMessage}</Text>}
    </View>
    
    <View style={{paddingTop:10, alignItems: 'center'}}>
        <TouchableOpacity style={styles.changePassButton}>
            <Text onPress={()=>changePassword()} style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
textInput:{
    width: "50%",
    height: 21,
    borderWidth: 1,
    borderColor: '#401F02',
    paddingLeft: 5,
    backgroundColor: 'white',
  },

  changePassButton: {
    width: "50%",
    height: 35,
    borderWidth: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#401F02',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
})

export default ChangePassword
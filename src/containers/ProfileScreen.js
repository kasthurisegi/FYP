import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { WhatsAppOutlined } from '@ant-design/icons'
import { auth } from '../../FirebaseConfig'
import { signOut } from "firebase/auth";

const ProfileScreen = () => {

  function handleLogin(){
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Logout Successful')
    }).catch((error) => {
      // An error happened.
    });
  }
  
  return (
      <View style={styles.container}>
          
          <Image resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }} source={require('../assets/room.jpg')}></Image>
          <Text style={{color:'#000000', fontSize: '16px', fontWeight: '700'}}>Anna Mona</Text>
        <View style={styles.btnsContainer}>

                <TouchableOpacity onPress={()=> {}} style={styles.editButton}>
                    <View style={styles.flexDirection}>
                      <Ionicons name={'person'} size={25} style={{}}/>
                      <Text style={{color:'#000000', fontSize: '20px', fontWeight: '500'}}>Edit Profile</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {}} style={styles.policyButton}>
                    <View style={styles.flexDirection}>
                      <Ionicons name={'shield-checkmark'} size={27} style={{}}/>
                      <Text style={{color:'#000000', fontSize: '20px', fontWeight: '500'}}>Privacy Policy</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {}} style={styles.termsButton}>
                    <View style={styles.flexDirection}>
                      <Ionicons name={'information-circle'} size={30} style={{}}/>
                      <Text style={{color:'#000000', fontSize: '20px', fontWeight: '500'}}>Terms & Conditions</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {}} style={styles.deactivateAccount}>
                    <View style={styles.flexDirection}>
                      <Entypo name={'remove-user'} size={25} style={{}}/>
                      <Text style={{color:'#000000', fontSize: '20px', fontWeight: '500'}}>Deactivate Account</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>  handleLogin() } style={styles.logoutButton}>
                    <View style={styles.flexDirection}>
                      <Ionicons name={'log-out-outline'} size={30} style={{}}/>
                      <Text style={{color:'#000000', fontSize: '20px', fontWeight: '500'}}>logout</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      height:'100%',
      width:'100%',
      overflow: 'scroll',
      display: "flex",
      paddingTop: "20px",
      paddingBottom: '20px',
      alignItems: 'center',
      gap: 20
    },

    flexDirection: {
      flexDirection: 'row',
      gap: 15,
    },

    btnsContainer: {
      flex: 1,
      height: "100%",
      width:'100%',
      paddingTop: '20px',
      paddingVertical: "20px",
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: 10,
    },

    editButton: {
      width: '90%', 
      height: '20%',  
      paddingLeft: '30px',
      alignItems: 'flex-start', 
      justifyContent: 'center',
      backgroundColor: '#ECD0B8',
      borderRadius: '50px',
      borderColor: 'black',
      borderWidth: '1px',
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.36,
      shadowRadius: 7,
      elevation: 11,
    },

    policyButton: {
      width: '90%', 
      height: '20%',  
      paddingLeft: '30px',
      alignItems: 'flex-start', 
      justifyContent: 'center',
      backgroundColor: '#ECD0B8',
      borderRadius: '50px',
      borderColor: 'black',
      borderWidth: '1px',
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.36,
      shadowRadius: 7,
      elevation: 11,
    },

    termsButton: {
      width: '90%', 
      height: '20%',  
      paddingLeft: '30px',
      alignItems: 'flex-start', 
      justifyContent: 'center',
      backgroundColor: '#ECD0B8',
      borderRadius: '50px',
      borderColor: 'black',
      borderWidth: '1px',
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.36,
      shadowRadius: 7,
      elevation: 11,
    },

    logoutButton: {
      width: '90%', 
      height: '20%',  
      paddingLeft: '30px',
      alignItems: 'flex-start', 
      justifyContent: 'center',
      backgroundColor: '#ECD0B8',
      borderRadius: '50px',
      borderColor: 'black',
      borderWidth: '1px',
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.36,
      shadowRadius: 7,
      elevation: 11,
    },

    deactivateAccount: {
      width: '90%', 
      height: '20%',  
      paddingLeft: '30px',
      alignItems: 'flex-start', 
      justifyContent: 'center',
      backgroundColor: '#ECD0B8',
      borderRadius: '50px',
      borderColor: 'black',
      borderWidth: '1px',
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.36,
      shadowRadius: 7,
      elevation: 11,
    },



  }
)

export default ProfileScreen
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'

const RoommateViewPostScreen = () => {

// page navagation
const navigation = useNavigation();

  return (

    
    <View style={styles.container}>
      <Text style={styles.findRoommateTitle}>Find Roommate</Text>
      <View style={styles.roommateProfileContainer}>
        <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={require('../assets/room.jpg')}></Image>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        paddingVertical: "30px",
        alignItems: 'center'
      },
    
    findRoommateTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: '30px'
    },

    roommateProfileContainer: {
        width: '110%',
        height: '35%',
        backgroundColor: '#FFEDDD',
        padding: '30px',
        borderColor: '#401F02',
        borderWidth: '3px'
      },
    
    profileImageContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      margin: '15px'
      
  },

    profileImage: {
        flex: 1,
        height: 100,
        width: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
        
    }
})


export default RoommateViewPostScreen
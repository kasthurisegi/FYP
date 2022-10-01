import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import AntDesignIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>Welcome to Roomarch</Text>
        
      </View>
    </View>
    /* <FontAwesome5 name='user-friends' size={35}/>
        <MaterialIcons name='home' size={50}/> */
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingVertical: "30px"
  },
  WelcomeContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: '#F5C79F',
    alignItems: 'center',
    paddingVertical: '15px'
  },
  WelcomeText: {
    fontSize: '24px',
    fontWeight: 'bold'
  }

});

export default HomeScreen
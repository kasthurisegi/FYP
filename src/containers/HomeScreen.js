import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import AntDesignIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      
      <View style={styles.infoContainer}>
        <View style={{padding: 0}}>
            <Text style={{paddingTop: "10px", paddingVertical: 5, fontSize: 20, fontWeight:'800' , color:'#401F02'}}>Welcome to Roomarch</Text>
        </View>

        <View style={styles.searchIcon}>
        <View style={{padding: 20}}>
        <View>
            <AntDesignIcon name={'search-plus'} size={50} style={{marginLeft: 50}}/>  
            <Text style={{paddingTop: "10px", paddingVertical: 5, fontSize: 20, fontWeight:'800' , color:'#401F02', textAlign: 'center'}}>Welcome to Roomarch</Text>
        </View> 
        </View>
        </View>

        <View style={styles.searchcon}>
        <View style={{padding: 20}}>
        <View>
            <AntDesignIcon name={'search-plus'} size={50} style={{marginLeft: 50}}/>  
            <Text style={{paddingTop: "10px", paddingVertical: 5, fontSize: 20, fontWeight:'800' , color:'#401F02', textAlign: 'center'}}>Welcome to Roomarch</Text>
        </View> 
        </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "50px"
  },

  infoContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: '#F5C79F',
    borderColor: '#401f02',
    borderWidth: 1
  },

  searchIcon: {
    width: '50%',
    height: '20%',
    marginRight: '200px',
        
  },

  searchcon: {
    width: '50%',
    height: '20%',
    marginRight: '200px',
    paddingTop: '60px'
        
  }

});

export default HomeScreen
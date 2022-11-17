import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HomeScreen = () => {

// page navagation
const navigation = useNavigation();

  return (

// welcome section
    
    <View style={styles.container}>
      <View style={styles.WelcomeContainer}>
        <Text style={styles.WelcomeText}>Welcome to Roomarch</Text>
        <View style={{ flexDirection:"row"}}>
          <View style={styles.friendIcon}>
            <FontAwesome5 name='user-friends' size={40}/>
            <Text style={styles.friendIconText}>You can find for roommate</Text>
          </View>
          <View style={styles.homeIcon}>
            <MaterialIcons name='home' size={42}/>
            <Text style={styles.homeIconText}>Search for available rooms</Text>
          </View>
        </View>
      </View>


{/* roommate option */}
      
        <Text style={styles.roommateText}>Find Roommate</Text>
          <View style={styles.roommateOptionContainer}>
              <Image style={styles.roommateimageContainer} source={require('../assets/room.jpg')}></Image>
              <View style={{ flexDirection:"row", alignItems: 'center', paddingBottom: '30px', paddingLeft: '30px', paddingRight: '30px'}}>
              <TouchableOpacity style={styles.roommateButtonView} onPress={()=>navigation.navigate('RoommateViewPostScreen')} >
              <Text style={{color:'#FFFFFF'}}>View Post</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.roommateAddPostButton} onPress={()=>navigation.navigate('AddRoommateScreen')}>
              <Text style={{color:'#FFFFFF'}}>Add Post</Text>
              </TouchableOpacity>
            </View>
        </View>

{/* room option */}
        <Text style={styles.roomText}>Find Room</Text>
        <View style={styles.roomOptionContainer}>
            <Image style={styles.roomimageContainer} source={require('../assets/room.jpg')}></Image>
            <View style={{ flexDirection:"row", alignItems: 'center', paddingBottom: '30px', paddingLeft: '30px', paddingRight: '30px'}}>
            <TouchableOpacity style={styles.roomButtonView} onPress={()=>navigation.navigate('RoomViewPostScreen')} >
            <Text style={{color:'#FFFFFF'}}>View Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roomAddPostButton} onPress={()=>navigation.navigate('AddRoomScreen')}>
            <Text style={{color:'#FFFFFF'}}>Add Post</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    height: '100px',
    overflow: 'scroll',
    paddingBottom: '30px',
    alignItems: 'center'
  },


// welcome container
  WelcomeContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: '#F5C79F',
    paddingVertical: '15px',
    borderColor: '#401F02',
    borderWidth: '2px',
    borderLeftWidth: '0px',
    borderRightWidth: '0px'
  },
  WelcomeText: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  friendIcon: {
    flex: 1,
    display: "flex", 
    alignItems: 'center',
    paddingVertical: '30px',
    
  },
  friendIconText: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    paddingVertical: '30px',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
    
  },
  homeIconText: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    paddingVertical: '30px',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
    
    
  },
  homeIcon: {
    flex: 1,
    display: "flex", 
    alignItems: 'center',
    paddingVertical: '30px',
    
  },



// option container (roommate)  
  roommateOptionContainer: {
    width: '80%',
    height: '30%',
    backgroundColor: '#F5C79F',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  roommateText: {
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '30px'
  },
  roommateimageContainer: {
    flex: 1,
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    marginBottom: '30px'
  },
  roommateButtonView: {
    flex: 1,
    display: "flex",
    marginEnd: '30px',
    width: 100, 
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
  roommateAddPostButton: {
    flex: 1,
    display: "flex",
    width: 100, 
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

  
// option container (room)  
  roomOptionContainer: {
    width: '80%',
    height: '30%',
    backgroundColor: '#F5C79F',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  roomText: {
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '30px'
  },
  roomimageContainer: {
    flex: 1,
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    marginBottom: '30px'
  },
  roomButtonView: {
    flex: 1,
    display: "flex",
    marginEnd: '30px',
    width: 100, 
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
  roomAddPostButton: {
    flex: 1,
    display: "flex",
    width: 100, 
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

});

export default HomeScreen
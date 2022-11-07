import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons';

const RoommateViewPostScreen = () => {

// page navagation
const navigation = useNavigation();

  return (

    
    <View style={styles.container}>
      <Text style={styles.findRoommateTitle}>Find Roommate</Text>
      <View style={styles.roommateProfileContainer}>
        <View style={styles.profileImageContainer}>
          <Image resizeMode='cover' style={{aspectRatio: 1, width: '100%', borderWidth: '3.5px' }} source={require('../assets/room.jpg')}></Image>
        </View>
        <View style={styles.profileDetailsContainer} >
          <View style={styles.topContainer} >
            <View style={styles.nameContainer}>
                <Text style={{fontSize: '13px', fontWeight: "600"}}>Robert Fox</Text>
                  <View style={styles.ageContainer}>
                    <Text style={{fontSize: '12px'}}>31</Text>
                    <Text style={{fontSize: '12px'}}>,</Text>
                    <Text style={{fontSize: '12px'}}>Male</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: '12px'}}>City</Text>
                  </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={{fontSize: '16px', fontWeight: "800"}}>RM100</Text>
                <Text style={{fontSize: '10px'}}>/</Text>
                <Text style={{fontSize: '10px'}}>Month</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
          <Text style={{fontSize: '10px', paddingTop: '10px'}}> 
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
            Velit officia consequat duis enim velit mollit. 
            Exercitation veniam consequat.
          </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
              <AntDesignIcon name={'hearto'} size={25} style={{}}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <WhatsAppOutlined style={{ fontSize: '25px', color: '#25D366' }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{
              width: 100, 
              height: 30, 
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
            }}>
              <Text style={{color:'#FFFFFF'}}>View Details</Text>
            </TouchableOpacity>

          </View>
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
        alignItems: 'center',
      },
    
    findRoommateTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: '30px'
    },

    roommateProfileContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '40%',
        backgroundColor: '#FFEDDD',
        padding: '15px',
        borderColor: '#401F02',
        borderWidth: '3px',
        borderLeftWidth: '0px',
        borderRightWidth: '0px',
        gap: 20
      },
    
    profileImageContainer: {
      flex: 0.8,
      justifyContent: 'center',
    },

    profileDetailsContainer: {
      flex: 1,
      paddingTop: "15px",
      paddingBottom: "15px",
      gap: 5,
    },

    topContainer:{
      flexDirection: "row",
      width: '100%',
      height: '30%',
    },

    nameContainer:{
      flexDirection: "column",
      width: '40%',
      height: '100%',
    },

    ageContainer:{
      flexDirection: "row",
      width: '100%',
      height: '50%',
    },

    priceContainer:{
      flexDirection: "row",
      width: '55%',
      height: '100%',
      alignItems: 'baseline',
      paddingRight: '10px',
      justifyContent: 'flex-end',
    },

    bottomContainer:{
      flexDirection: "row",
      width: '100%',
      height: '40%',
    },

    buttonContainer:{
      flexDirection: "row",
      width: '100%',
      height: '30%',
      paddingTop: '5px',
      gap: 20
    },

})


export default RoommateViewPostScreen
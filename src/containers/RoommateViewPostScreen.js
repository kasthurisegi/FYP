import { View, Text, StyleSheet, Image,TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons'
import { DataProcessorContext } from '../context/DataProcessor'
import { auth, storage, db } from '../../FirebaseConfig'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

const RoommateViewPostScreen = () => {

// page navagation
const navigation = useNavigation();


const { 
    currentUser,
    roommate,
    selectedRoommate,
    dispatchSelectRoommate,
    favorite
  } = useContext(DataProcessorContext);

  const [currRoommate, setCurrRoommate] = useState(null);

  useEffect(() => {
    const newArray = roommate?.map(item => {
      var state = favorite && favorite.some(fav => item.roommateID === fav.roommateID)
        return {...item, favorite: state}
    })

    setCurrRoommate(newArray)
    
  },[favorite, roommate])

  function handleSelectRoommate(val){
    dispatchSelectRoommate({ type: "CHANGE_ROOMMATE", payload: val })
    navigation.navigate("RoommateDetails")
  };

  function handleFavorite(val){
    try {

      var body = {
        favoriteID: uuid(),
        userID: currentUser.userID,
        roommateID: val,
        createdBy: moment().format()
      }
      //Add user details to firestore
      setDoc(doc(db, "favorite", body.favoriteID), body).then(() => {
        console.log('Favorited roommate')
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleRemoveFavorite(val){
    const favoriteID = favorite.filter(item => item.roommateID === val)
    await deleteDoc(doc(db, "favorite", favoriteID[0].favoriteID));
  }

  return (
    <View style={styles.container}>
      {currRoommate && currRoommate.map((item,index) => {
        return(
          <View key={index} style={styles.roommateProfileContainer}>
            <View style={styles.profileImageContainer}>
              <Image resizeMode='cover' style={{aspectRatio: 1, width: '100%', borderWidth: '3.5px' }} source={{ uri: item.profilePic }}></Image>
            </View>
            <View style={styles.profileDetailsContainer} >
              <View style={styles.topContainer} >
                <View style={styles.nameContainer}>
                    <Text style={{fontSize: '13px', fontWeight: "700"}}>{item.name}</Text>
                      <View style={styles.ageContainer}>
                        <Text style={{fontSize: '12px'}}>{item.age}</Text>
                        <Text style={{fontSize: '12px'}}>,</Text>
                        <Text style={{fontSize: '12px'}}>{item.gender}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: '12px', fontWeight: "600"}}>{item.city}</Text>
                      </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={{fontSize: '16px', fontWeight: "800"}}>RM{item.price}</Text>
                    <Text style={{fontSize: '10px'}}>/</Text>
                    <Text style={{fontSize: '10px'}}>Month</Text>
                </View>
              </View>
              <View style={styles.bottomContainer}>
              <Text style={{fontSize: '10px', paddingTop: '10px'}}>
                {item.description}
              </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => item.favorite ? handleRemoveFavorite(item.roommateID) : handleFavorite(item.roommateID) }>
                  {item.favorite ?
                    <AntDesignIcon name={'heart'} size={30} style={{}}/> 
                    :
                    <AntDesignIcon name={'hearto'} size={30} style={{}}/> 
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  //Open whatsapp with number
                  Linking.openURL(
                    'http://api.whatsapp.com/send?phone=6'+ item.whatsapp
                  );
                }}>
                  <WhatsAppOutlined style={{ fontSize: '30px', color: '#25D366' }}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewDetailsBtn} onPress={()=> handleSelectRoommate(item) } >
                  <Text style={{color:'#FFFFFF'}}>View Details</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        )
      })
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        overflow: 'scroll',
        paddingVertical: "30px",
        alignItems: 'center',
        gap: '30px'
      },

    roommateProfileContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '45%',
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
      paddingTop: '15px',
      gap: 10
    },

    viewDetailsBtn:{
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

})


export default RoommateViewPostScreen
import { SafeAreaView,StyleSheet, ScrollView, View, Text, Dimensions, Image, TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect, useContext, useRef} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons'
import { DataProcessorContext } from '../context/DataProcessor'
import { auth, storage, db } from '../../FirebaseConfig'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

const RoomViewPostScreen = () => {

const navigation = useNavigation();

const { 
    currentUser,
    room,
    selectedRoommate,
    dispatchSelectRoommate,
    favoriteRoom,
    dispatchSelectRoom
  } = useContext(DataProcessorContext);

  const [currRoom, setCurrRoom] = useState(null);

  useEffect(() => {
    const newArray = room?.map(item => {
      var state = favoriteRoom && favoriteRoom.some(fav => item.roomID === fav.roomID)
        return {...item, favorite: state}
    })

    setCurrRoom(newArray)
    
  },[favoriteRoom, room])

  function handleSelectRoom(val){
    dispatchSelectRoom({ type: "CHANGE_ROOM", payload: val })
    navigation.navigate("RoomDetails")
  };

  function handleFavorite(val){
    try {

      var body = {
        favoriteID: uuid(),
        userID: currentUser?.userID,
        roomID: val,
        createdBy: moment().format()
      }
      //Add user details to firestore
      setDoc(doc(db, "favoriteRoom", body.favoriteID), body).then(() => {
        console.log('Favorited room')
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleRemoveFavorite(val){
    const favoriteID = favorite.filter(item => item.roomID === val)
    await deleteDoc(doc(db, "favoriteRoom", favoriteID[0].favoriteID));
  }
  

  return (

   <View style={styles.mainContainer}>

      <View style= {styles.displayContainer}>
        {currRoom && currRoom.map((item,index) => {
          return(
            <View key={index} style= {styles.cardContainer}>
              <View style={{ display: 'flex', flexDirection: 'row', width: '100%', overflow: 'scroll', paddingHorizontal: '15px', gap: '10px', paddingBottom: '10px' }}>
               {item.roomPic.map((pic, index) => {
                return(
                  <Image key={index} resizeMode='cover' style={{aspectRatio: 1, width: '200px', borderWidth: '2px', borderRadius: '15px' }} source={{ uri: pic }}></Image>
                )
              })
              }
              </View>
              <View style={styles.detailsContainer}>
              <View style={styles.profilePictureContainer}>
                <Image resizeMode='cover' style={{aspectRatio: 1, width: '100%', borderWidth: '2px', borderRadius: '100%' }} source={{ uri: item.profilePic }}></Image>
              </View>
              <View style={styles.profileInfoContainer} >
                <View style={styles.upperContainer} >
                  <View style={styles.usernameContainer}>
                      <Text style={{fontSize: '13px', fontWeight: "700"}}>{item.name}</Text>
                        <View style={styles.userAgeContainer}>
                          <Text style={{fontSize: '12px'}}>{item.age}</Text>
                          <Text style={{fontSize: '12px'}}>,</Text>
                          <Text style={{fontSize: '12px'}}>{item.gender}</Text>
                        </View>
                        <View>
                            <Text>{item.city}</Text>
                        </View>
                  </View>
                  <View style={styles.amountContainer}>
                      <Text style={{fontSize: '16px', fontWeight: "800"}}>RM{item.price}</Text>
                      <Text style={{fontSize: '10px'}}>/</Text>
                      <Text style={{fontSize: '10px'}}>Month</Text>
                  </View>
                </View>
                <View style={styles.belowContainer}>
                <Text style={{fontSize: '10px', paddingTop: '10px'}}> 
                  {item.description}
                </Text>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => item.favorite ? handleRemoveFavorite(item.roomID) : handleFavorite(item.roomID) }>
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
                  <TouchableOpacity style={styles.btnViewDetails} onPress={()=> handleSelectRoom(item)} >
                    <Text style={{color:'#FFFFFF'}}>View Details</Text>
                  </TouchableOpacity>

                </View>
              </View>
              </View> 
              </View>
          )
        })}
      </View>
      </View>
  )
}

const styles = StyleSheet.create({

      mainContainer: {
        flex: 1,
        display: "flex",
        paddingVertical: "30px",
        alignItems: 'center',
      },

      displayContainer: {
        flex: 1,
        display: "flex",
        alignItems: 'center',
        width: '100%'
      },

      cardContainer: {
          flexDirection: 'column',
          width: '90%',
          height: '60%',
          backgroundColor: '#FFEDDD',
          shadowRadius: '10px',
          borderRadius: '20px',
          padding: '10px',
      },
      
      profilePictureContainer: {
        flex: 0.25,
        paddingTop: '10px',
        paddingLeft: '10px',
      },
      profileInfoContainer: {
        flex: 1,
        paddingTop: "15px",
        paddingBottom: "15px",
        gap: 15,
      },
  
      upperContainer:{
        flexDirection: "row",
        width: '100%',
        height: '30%',
      },
  
      usernameContainer:{
        flexDirection: "column",
        width: '40%',
        height: '100%',
      },
  
      userAgeContainer:{
        flexDirection: "row",
        width: '100%',
        height: '50%',
      },
  
      amountContainer:{
        flexDirection: "row",
        width: '55%',
        height: '100%',
        alignItems: 'baseline',
        paddingRight: '10px',
        justifyContent: 'flex-end',
      },
  
      belowContainer:{
        flexDirection: "row",
        width: '100%',
        height: '40%',
      },
  
      btnContainer:{
        flexDirection: "row",
        width: '100%',
        height: '30%',
        paddingTop: '5px',
        gap: 30,
      },

      detailsContainer:{
        flexDirection: "row",
        width: '100%',
        height: '40%',
        gap: 10,
      },

      btnViewDetails:{
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
  }
)


export default RoomViewPostScreen
import { View, Text, StyleSheet, Image,TouchableOpacity, Linking, Button, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons'
import { DataProcessorContext } from '../context/DataProcessor'
import DropDownPicker from 'react-native-dropdown-picker';
import { v4 as uuid } from 'uuid';
import { auth, storage, db } from '../../FirebaseConfig'
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';


const RoomDetails = () => {

// page navagation
const navigation = useNavigation();

const {
    selectedRoom,
    currentUser
  } = useContext(DataProcessorContext);

  const [roomDetails, setRoomDetails] = useState({
    userID: selectedRoom.userID,
    title: selectedRoom.title,
    price: selectedRoom.price,
    description: selectedRoom.description,
    roomType: selectedRoom.roomType,
    furnishType: selectedRoom.furnishType,
    numberOfPeople: selectedRoom.numberOfPeople,
    building: selectedRoom.building,
    address: selectedRoom.address,
    city: selectedRoom.city,
    householdNumber: selectedRoom.householdNumber,
    preferredGender: selectedRoom.preferredGender,
    preferredAge: selectedRoom.preferredAge,
    occupationStatus: selectedRoom.occupationStatus,
    preferredPet: selectedRoom.preferredPet,
    roomPic: selectedRoom.roomPic,
    whatsapp: selectedRoom.whatsapp,
  })
  
  const [roomPic, setroomPic] = useState(null)

  const [openRoomType, setOpenRoomType] = useState(false)
  const [roomType, setRoomType] = useState([
      {label: 'Master Bedroom', value: 'Master Bedroom'},
      {label: 'Single Bedroom', value: 'Single Bedroom'},
      {label: 'Double Bedroom', value: 'Double Bedroom'},
  ]);

  const [openFurnishType, setOpenFurnishType] = useState(false)
  const [furnishType, setFurnishType] = useState([
      {label: 'Fully Furnished', value: 'Fully Furnished'},
      {label: 'Partly Furnished', value: 'Partly Furnished'},
      {label: 'Non Furnished', value: 'Non Furnished'},
  ]);

  const [openPreferGender, setOpenPreferGender] = useState(false)
  const [preferGender, setPreferGender] = useState([
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'}
  ]);

  async function uploadImage(imageUri) {

    var urlList = []

    for(var x = 0; x < imageUri.length; x++){
      try {
        const response = await fetch(imageUri[x].uri)
        const blobFile = await response.blob()
    
        const reference = ref(storage, `${uuid()}.jpg`)
        const result = await uploadBytes(reference, blobFile)
        const url = await getDownloadURL(result.ref)
    
        urlList.push(url)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return urlList;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true
    });

    if (!result.cancelled) {
      setroomPic(result.selected)
    }
  };

  const updateRoom = async () => {

    const roomRef = doc(db, "room", selectedRoom.roomID);

    if(roomPic){
      uploadImage(roomPic).then((url) => {
        //for multiple image, put url will do no need url[0]
        let body = {...roomDetails, roomPic: url}

        updateDoc(roomRef, body).then(res => {
          alert('Post Updated');
          navigation.navigate("RoomViewPostScreen")
        })
        
      })
    }
    
    else{
      let body = roomDetails;
      await updateDoc(roomRef, body).then(res => {
        alert('Post Updated');
        navigation.navigate("RoomViewPostScreen")
      })
      
    }
  }

  const deleteRoom = async () => {
    await deleteDoc(doc(db, "room", selectedRoom.roomID)).then(res => {
      alert("Post Deleted ")
      navigation.navigate("RoomViewPostScreen")
    })
  }

  return (
        <>
          {roomDetails && roomDetails.userID === currentUser.userID ?
            <View style={styles.container}>
            
              <Image source={{ uri: roomDetails.uri ? roomPic[0].uri : roomDetails.roomPic }} resizeMode='cover' style={{aspectRatio: 1, width: '100px', height: '100px', borderWidth: '2px', borderRadius: '15px' }}/>
                
              <Button title="Choose Image" onPress={pickImage} />

              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Title:</Text>
                <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, title: e.target.value })}} value={roomDetails.title}></TextInput>
              </View>

              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Price per Month:</Text>
                <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, price: e.target.value })}} value={roomDetails.price}></TextInput>
              </View>

              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Description:</Text>
                <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, description: e.target.value })}} value={roomDetails.description}></TextInput>
              </View>
              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
                <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, whatsapp: e.target.value }) }} value={roomDetails.whatsapp}></TextInput>
              </View>
              
              <View style={styles.details}>
                <Text>Room Preferences</Text>
                <View style={[styles.inputContainer, { zIndex: 999 }]}>
                <Text style={{paddingVertical: 5}}>Room Type:</Text>
                <DropDownPicker style={styles.doprdownTextInput}
                    open={openRoomType}
                    value={roomDetails.roomType}
                    items={roomType}
                    setOpen={setOpenRoomType}
                    onSelectItem={(item) => {
                      setRoomDetails({...roomDetails, roomType: item.value })
                    }}
                    setItems={setRoomType}
                    />
                </View>
                <View style={[styles.inputContainer, { zIndex: 998 }]}>
                  <Text style={{paddingVertical: 5}}>Furnish Type:</Text>
                  <DropDownPicker style={styles.doprdownTextInput}
                      open={openFurnishType}
                      value={roomDetails.furnishType}
                      items={furnishType}
                      setOpen={setOpenFurnishType}
                      onSelectItem={(item) => {
                        setRoomDetails({...roomDetails, furnishType: item.value })
                      }}
                      setItems={setFurnishType}
                      />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Number of People:</Text>
                  <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, numberOfPeople: e.target.value }) }} value={roomDetails.numberOfPeople}></TextInput>
                </View>
              </View>

              <View style={styles.details}>
                <Text>Area Preferences</Text>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Building:</Text>
                  <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, building: e.target.value }) }} value={roomDetails.building}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Address:</Text>
                  <TextInput style={styles.textInput} onChange={(e) => {setRoomDetails({...roomDetails, address: e.target.value }) }} value={roomDetails.address}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>City:</Text>
                  <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, city: e.target.value })}} value={roomDetails.city}></TextInput>
                </View>
              </View>

              <View style={styles.details}>
                <Text>Other Preferences</Text>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Household Number:</Text>
                  <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, householdNumber: e.target.value }) }} value={roomDetails.householdNumber}></TextInput>
                </View>
                <View style={[styles.inputContainer, { zIndex: 999 }]}>
                  <Text style={{paddingVertical: 5}}>Preferred Gender:</Text>
                  <DropDownPicker style={styles.doprdownTextInput}
                      zIndex={1000}
                      open={openPreferGender}
                      value={roomDetails.preferredGender}
                      items={preferGender}
                      setOpen={setOpenPreferGender}
                      onSelectItem={(item) => {
                        setRoomDetails({...roomDetails, preferredGender: item.value })
                      }}
                      setItems={setPreferGender}
                      />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Preferred Age:</Text>
                  <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, preferredAge: e.target.value }) }} value={roomDetails.preferredAge}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Occupation Status:</Text>
                  <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, occupationStatus: e.target.value }) }} value={roomDetails.occupationStatus}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Preferred Pet:</Text>
                  <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, preferredPet: e.target.value }) }} value={roomDetails.preferredPet}></TextInput>
                </View>
              </View>

              <TouchableOpacity onPress={()=> { updateRoom() }} style={styles.updateButton}>
                <Text style={{color:'white', fontSize: '16px', fontWeight:'400'}}>Update Room</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> { deleteRoom() }} style={styles.deleteButton}>
                <Text style={{color:'white', fontSize: '16px', fontWeight:'400'}}>Delete Roommate</Text>
              </TouchableOpacity>

            </View>

            :

            <View style={styles.container}>
            
              <Image source={{ uri: roomDetails.uri }} resizeMode='cover' style={{aspectRatio: 1, width: '100px', height: '100px', borderWidth: '2px', borderRadius: '15px' }}/>
                

              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Title:</Text>
                <Text style={styles.textInput}>{roomDetails.title}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Price per Month:</Text>
                <Text style={styles.textInput}>{roomDetails.price}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={{paddingVertical: 5}}>Description:</Text>
                <Text style={styles.textInput}>{roomDetails.description}</Text>
              </View>
              <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
                  <Text style={styles.textInput}>{roomDetails.whatsapp}</Text>
              </View>
              
              <View style={styles.details}>
                <Text>Room Preferences</Text>
                <View style={[styles.inputContainer, { zIndex: 999 }]}>
                <Text style={{paddingVertical: 5}}>Room Type:</Text>
                <Text style={styles.textInput}>{roomDetails.roomType}</Text>
                </View>
                <View style={[styles.inputContainer, { zIndex: 998 }]}>
                  <Text style={{paddingVertical: 5}}>Furnish Type:</Text>
                  <Text style={styles.textInput}>{roomDetails.furnishType}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Number of People:</Text>
                  <Text style={styles.textInput} >{roomDetails.numberOfPeople}</Text>
                </View>
              </View>

              <View style={styles.details}>
                <Text>Area Preferences</Text>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Building:</Text>
                  <Text style={styles.textInput} >{roomDetails.building}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Address:</Text>
                  <Text style={styles.textInput} >{roomDetails.address}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>City:</Text>
                  <Text style={styles.textInput}>{roomDetails.city}</Text>
                </View>
              </View>

              <View style={styles.details}>
                <Text>Other Preferences</Text>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Household Number:</Text>
                  <Text style={styles.textInput}>{roomDetails.householdNumber}</Text>
                </View>
                <View style={[styles.inputContainer, { zIndex: 999 }]}>
                  <Text style={{paddingVertical: 5}}>Preferred Gender:</Text>
                  <Text style={styles.textInput}>{roomDetails.preferredGender}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Preferred Age:</Text>
                  <Text style={styles.textInput}>{roomDetails.preferredAge}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Occupation Status:</Text>
                  <Text style={styles.textInput}>{roomDetails.occupationStatus}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{paddingVertical: 5}}>Preferred Pet:</Text>
                  <Text style={styles.textInput}>{roomDetails.preferredPet}</Text>
                </View>
              </View>
            </View>
          }
        </>

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
    gap: 10
  },
  flexDirection: {
    flexDirection: 'row',
    gap: 15,
  },
  inputContainer: {
    width: '80%'
  },
  details: {
    paddingVertical: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  textInput:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#401F02',
    paddingLeft: 5,
    backgroundColor: 'white',
    height: 30
  },
  doprdownTextInput:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#401F02',
    paddingLeft: 5,
    backgroundColor: 'white',
    height: 30,
    zIndex: 10000,
  },
  updateButton: {
    width: '40%', 
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: '20px',
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

  deleteButton: {
    width: '40%', 
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B0000',
    borderRadius: '20px',
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

  
})

export default RoomDetails
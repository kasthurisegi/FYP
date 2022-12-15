import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserInfoContext } from '../context/userInfoContext'
import { auth, storage, db } from '../../FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { DataProcessorContext } from '../context/DataProcessor'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownPicker from 'react-native-dropdown-picker';
import { v4 as uuid } from 'uuid';

const AddRoomScreen = () => {

  const navigation = useNavigation();

  const { 
      currentUser,
      roommate
    } = useContext(DataProcessorContext);

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

  const [roomDetails, setRoomDetails] = useState({
    title: '',
    price: '',
    description: '',
    roomType: '',
    furnishType: '',
    numberOfPeople: '',
    building: '',
    address: '',
    city: '',
    householdNumber: '',
    preferredGender: '',
    preferredAge: '',
    occupationStatus: '',
    preferredPet: '',
    roomPic: null
  })

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
    setRoomDetails({...roomDetails, roomPic: result.selected })
  }
};

async function isEmptyObject(obj) {

  const checker = Object.values(obj).every(
    value => { return value !== "" && value !== null ? true : false }
  );

  return checker
  
};

  const handleAddRoom = () => {
    
    isEmptyObject(roomDetails).then(val => {
      if(val){

        uploadImage(roomDetails.roomPic).then(url => {

          var body = {
            ...roomDetails, 
            roomPic: url, 
            roomID: uuid(),
            userID: currentUser.userID,
            name: currentUser?.userName,
            age: currentUser?.userAge,
            gender: currentUser?.userGender,
            whatsapp: currentUser?.userWhatsapp,
            profilePic: currentUser?.userProfile
          };

          try {
            //Add user details to firestore
            console.log(body)
            setDoc(doc(db, "room", body.roomID), body).then(() => {
              console.log('Post added')
              alert('Post added')
              navigation.navigate("RoomViewPostScreen")
              //Pass user data to global state
            })
          } catch (e) {
            console.error("Error adding document: ", e);
          }

        });

      }else{
        alert('Please fill in all the information!')
      }
    })
    
  }

  return (
    <View style={styles.container}>
    {roomDetails.roomPic &&
      <View style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%', overflow: 'scroll', paddingHorizontal: '15px' }}>
        {roomDetails.roomPic.map((item, index) => {
          return(
            <Image key={index} source={{ uri: item.uri }} resizeMode='cover' style={{aspectRatio: 1, width: '100px', height: '100px', borderWidth: '2px', borderRadius: '15px' }}/>
          )
        })}
      </View>
      }
      <Button title="Choose Image" onPress={pickImage} />

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Title:</Text>
        <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, title: e.target.value }) }} value={roomDetails.title}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Price per Month:</Text>
        <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, price: e.target.value }) }} value={roomDetails.price}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Description:</Text>
        <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, description: e.target.value }) }} value={roomDetails.description}></TextInput>
      </View>
      <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, whatsapp: e.target.value }) }} value={roomDetails.whatsapp}></TextInput>
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
          <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, address: e.target.value }) }} value={roomDetails.address}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>City:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoomDetails({...roomDetails, city: e.target.value }) }} value={roomDetails.city}></TextInput>
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

      <TouchableOpacity onPress={()=> { handleAddRoom() }} style={styles.saveButton}>
        <Text style={{color:'#FFFFFF', fontSize: '16px', fontWeight:'400'}}>Add Room</Text>
      </TouchableOpacity>

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
  saveButton: {
    width: '40%', 
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#401F02',
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

export default AddRoomScreen
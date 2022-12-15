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
import RoommateViewPostScreen from './RoommateViewPostScreen'

const AddRoommateScreen = () => {

  const navigation = useNavigation();

  const { 
      currentUser,
      roommate
    } = useContext(DataProcessorContext);

  const [openGender, setOpenGender] = useState(false)
  const [gender, setGender] = useState([
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'}
  ]);

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

  const [roommateDetails, setRoommateDetails] = useState({
    title: '',
    name: '',
    age: '',
    gender: '',
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
    whatsapp: '',
    profilePic: null
  })

  async function uploadImage(imageUri) {
    try {
      const response = await fetch(imageUri)
      const blobFile = await response.blob()
  
      const reference = ref(storage, `${uuid()}.jpg`)
      const result = await uploadBytes(reference, blobFile)
      const url = await getDownloadURL(result.ref)
  
      return url
    } catch (err) {
      return Promise.reject(err)
  }
}

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setRoommateDetails({ ...roommateDetails, profilePic: result.uri });
  }
};

async function isEmptyObject(obj) {

  const checker = Object.values(obj).every(
    value => { return value !== "" && value !== null ? true : false }
  );

  return checker
  
};

  const handleAddRoommate = () => {
    
    isEmptyObject(roommateDetails).then(val => {
      if(val){

        uploadImage(roommateDetails.profilePic).then(url => {

          var body = {...roommateDetails, profilePic: url, roommateID: uuid(), userID: currentUser.userID};

          try {
            //Add user details to firestore
            setDoc(doc(db, "roommates", body.roommateID), body).then(() => {
              console.log('Post added')
              alert('Post added')
              navigation.navigate('RoommateViewPostScreen')
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
      {roommateDetails.profilePic ? 
          <Image source={{ uri: roommateDetails.profilePic }} resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }}/>
              :
          <Image resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }} source={{
          uri: "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
          }}/>
      }
      <Button title="Choose an Image" onPress={pickImage} />

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Title:</Text>
        <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, title: e.target.value }) }} value={roommateDetails.title}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Name:</Text>
        <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, name: e.target.value }) }} value={roommateDetails.name}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Age:</Text>
        <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, age: e.target.value }) }} value={roommateDetails.age}></TextInput>
      </View>

      <View style={[styles.inputContainer, { zIndex: 999 }]}>
        <Text style={{paddingVertical: 5}}>Gender:</Text>
        <DropDownPicker style={styles.doprdownTextInput}
            containerStyle={{ zIndex: 10000 }}
            open={openGender}
            value={roommateDetails.gender}
            items={gender}
            setOpen={setOpenGender}
            onSelectItem={(item) => {
              setRoommateDetails({...roommateDetails, gender: item.value })
            }}
            setItems={setGender}
            zIndex={1000}
            />
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Price per Month:</Text>
        <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, price: e.target.value }) }} value={roommateDetails.price}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Description:</Text>
        <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, description: e.target.value }) }} value={roommateDetails.description}></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
        <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, whatsapp: e.target.value }) }} value={roommateDetails.whatsapp}></TextInput>
      </View>
      
      <View style={styles.details}>
        <Text>Room Preferences</Text>
        <View style={[styles.inputContainer, { zIndex: 999 }]}>
        <Text style={{paddingVertical: 5}}>Room Type:</Text>
        <DropDownPicker style={styles.doprdownTextInput}
            open={openRoomType}
            value={roommateDetails.roomType}
            items={roomType}
            setOpen={setOpenRoomType}
            onSelectItem={(item) => {
              setRoommateDetails({...roommateDetails, roomType: item.value })
            }}
            setItems={setRoomType}
            />
        </View>
        <View style={[styles.inputContainer, { zIndex: 998 }]}>
          <Text style={{paddingVertical: 5}}>Furnish Type:</Text>
          <DropDownPicker style={styles.doprdownTextInput}
              open={openFurnishType}
              value={roommateDetails.furnishType}
              items={furnishType}
              setOpen={setOpenFurnishType}
              onSelectItem={(item) => {
                setRoommateDetails({...roommateDetails, furnishType: item.value })
              }}
              setItems={setFurnishType}
              />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Number of People:</Text>
          <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, numberOfPeople: e.target.value }) }} value={roommateDetails.numberOfPeople}></TextInput>
        </View>
      </View>

      <View style={styles.details}>
        <Text>Area Preferences</Text>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Building:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, building: e.target.value }) }} value={roommateDetails.building}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>City:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, address: e.target.value }) }} value={roommateDetails.address}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>State:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, city: e.target.value }) }} value={roommateDetails.city}></TextInput>
        </View>
      </View>

      <View style={styles.details}>
        <Text>Other Preferences</Text>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Household Number:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, householdNumber: e.target.value }) }} value={roommateDetails.householdNumber}></TextInput>
        </View>
        <View style={[styles.inputContainer, { zIndex: 999 }]}>
          <Text style={{paddingVertical: 5}}>Preferred Gender:</Text>
          <DropDownPicker style={styles.doprdownTextInput}
              zIndex={1000}
              open={openPreferGender}
              value={roommateDetails.preferredGender}
              items={preferGender}
              setOpen={setOpenPreferGender}
              onSelectItem={(item) => {
                setRoommateDetails({...roommateDetails, preferredGender: item.value })
              }}
              setItems={setPreferGender}
              />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Preferred Age:</Text>
          <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, preferredAge: e.target.value }) }} value={roommateDetails.preferredAge}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Occupation Status:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, occupationStatus: e.target.value }) }} value={roommateDetails.occupationStatus}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{paddingVertical: 5}}>Preferred Pet:</Text>
          <TextInput style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, preferredPet: e.target.value }) }} value={roommateDetails.preferredPet}></TextInput>
        </View>
      </View>

      

      <TouchableOpacity onPress={()=> { handleAddRoommate() }} style={styles.saveButton}>
        <Text style={{color:'#FFFFFF', fontSize: '16px', fontWeight:'400'}}>Add Roommate</Text>
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

export default AddRoommateScreen
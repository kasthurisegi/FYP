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

const RoommateDetails = () => {

// page navagation
const navigation = useNavigation();

const {
    selectedRoommate,
    currentUser
  } = useContext(DataProcessorContext);

  const [roommateDetails, setRoommateDetails] = useState({
    userID: selectedRoommate.userID,
    title: selectedRoommate.title,
    name: selectedRoommate.name,
    age: selectedRoommate.age,
    gender: selectedRoommate.gender,
    price: selectedRoommate.price,
    description: selectedRoommate.description,
    roomType: selectedRoommate.roomType,
    furnishType: selectedRoommate.furnishType,
    numberOfPeople: selectedRoommate.numberOfPeople,
    building: selectedRoommate.building,
    address: selectedRoommate.address,
    city: selectedRoommate.city,
    householdNumber: selectedRoommate.householdNumber,
    preferredGender: selectedRoommate.preferredGender,
    preferredAge: selectedRoommate.preferredAge,
    occupationStatus: selectedRoommate.occupationStatus,
    preferredPet: selectedRoommate.preferredPet,
    whatsapp: selectedRoommate.whatsapp,
    profilePic: selectedRoommate.profilePic
  })

  const [profilePic, setProfilePic] = useState(null);

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
    setProfilePic(result.selected)
  }
};



  const updateRoommate = async () => {

    const roommateRef = doc(db, "roommates", selectedRoommate.roommateID);

    if(profilePic){
      uploadImage(profilePic).then((url) => {
        //for multiple image, put url will do no need url[0]
        let body = {...roommateDetails, profilePic: url[0]}

        updateDoc(roommateRef, body).then(res => {
          alert('Updated Rommate');
        })
        
      })
    }else{
      let body = roommateDetails;
      await updateDoc(roommateRef, body).then(res => {
        alert('Updated Rommate');
      })
      
    }
  }

  const deleteRoommate = async () => {
    await deleteDoc(doc(db, "roommates", selectedRoommate.roommateID)).then(res => {
      alert("Deleted Roommates")
      navigation.navigate("HomeScreen")
    })
  }

  return (
    <>
      {roommateDetails && roommateDetails.userID === currentUser.userID ?
        <View style={styles.container}>

          <Image source={{ uri: profilePic ? profilePic[0].uri : roommateDetails.profilePic  }} resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }}/>

          <Button title="Choose an Image" onPress={pickImage}/>

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
                  console.log(item)
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

          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
            <TextInput keyboardType='numeric' style={styles.textInput} onChange={(e) => { setRoommateDetails({...roommateDetails, whatsapp: e.target.value }) }} value={roommateDetails.whatsapp}></TextInput>
          </View>

          <TouchableOpacity onPress={()=> { updateRoommate() }} style={styles.saveButton}>
            <Text style={{color:'#FFFFFF', fontSize: '16px', fontWeight:'400'}}>Update Roommate</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> { deleteRoommate() }} style={styles.saveButton}>
            <Text style={{color:'#FFFFFF', fontSize: '16px', fontWeight:'400'}}>Delete Roommate</Text>
          </TouchableOpacity>

        </View>

        :

        <View style={styles.container}>

          <Image source={{ uri: selectedRoommate.profilePic }} resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }}/>

          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Title:</Text>
            <Text style={styles.textInput}>{selectedRoommate.title}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Name:</Text>
            <Text style={styles.textInput}>{selectedRoommate.name}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Age:</Text>
            <Text keyboard style={styles.textInput}>{selectedRoommate.age}</Text>
          </View>

          <View style={[styles.inputContainer, { zIndex: 999 }]}>
            <Text style={{paddingVertical: 5}}>Gender:</Text>
            <Text keyboard style={styles.textInput}>{selectedRoommate.gender}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Price per Month:</Text>
            <Text style={styles.textInput}>{selectedRoommate.price}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Description:</Text>
            <Text style={styles.textInput}>{selectedRoommate.description}</Text>
          </View>
          
          <View style={styles.details}>
            <Text>Room Preferences</Text>
            <View style={[styles.inputContainer, { zIndex: 999 }]}>
            <Text style={{paddingVertical: 5}}>Room Type:</Text>
            <Text style={styles.textInput}>{selectedRoommate.roomType}</Text>
            </View>
            <View style={[styles.inputContainer, { zIndex: 998 }]}>
              <Text style={{paddingVertical: 5}}>Furnish Type:</Text>
              <Text style={styles.textInput}>{selectedRoommate.furnishType}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>Number of People:</Text>
              <Text style={styles.textInput}>{selectedRoommate.numberOfPeople}</Text>
            </View>
          </View>

          <View style={styles.details}>
            <Text>Area Preferences</Text>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>Building:</Text>
              <Text style={styles.textInput}>{selectedRoommate.building}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>City:</Text>
              <Text style={styles.textInput}>{selectedRoommate.address}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>State:</Text>
              <Text style={styles.textInput}>{selectedRoommate.city}</Text>
            </View>
          </View>

          <View style={styles.details}>
            <Text>Other Preferences</Text>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>Household Number:</Text>
              <Text style={styles.textInput}>{selectedRoommate.householdNumber}</Text>
            </View>
            <View style={[styles.inputContainer, { zIndex: 999 }]}>
              <Text style={{paddingVertical: 5}}>Preferred Gender:</Text>
              <Text style={styles.textInput}>{selectedRoommate.preferredGender}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>Preferred Age:</Text>
              <Text keyboard style={styles.textInput}>{selectedRoommate.preferredAge}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>Occupation Status:</Text>
              <Text style={styles.textInput}>{selectedRoommate.occupationStatus}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{paddingVertical: 5}}>Preferred Pet:</Text>
              <Text style={styles.textInput}>{selectedRoommate.preferredPet}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
            <Text keyboard style={styles.textInput}>{selectedRoommate.whatsapp}</Text>
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

export default RoommateDetails
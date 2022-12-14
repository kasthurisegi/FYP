import { View, Text, StyleSheet, Image, TouchableOpacity, Button, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserInfoContext } from '../context/userInfoContext'
import { auth, storage, db } from '../../FirebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { DataProcessorContext } from '../context/DataProcessor'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownPicker from 'react-native-dropdown-picker';
import { v4 as uuid } from 'uuid';

const EditProfile = () => {

    const navigation = useNavigation();

    const { 
        currentUser
      } = useContext(DataProcessorContext);

    const [image, setImage] = useState(null);
    const [name, setName] = useState(currentUser?.userName);
    const [phone, setPhone] = useState(currentUser?.userPhone);
    const [whatsapp, setWhatsapp] = useState(currentUser?.userWhatsapp);

    /////// Gender Picker /////
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(currentUser?.userGender);
    const [items, setItems] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}
    ]);

    /////////// Date Picker //////////
    const [selectedDate, setSelectedDate] = useState(new Date(currentUser?.userDob));

    /////////// Age Auto Fill Function //////////
    const [age, setAge] = useState(currentUser?.userAge)

    function handleDateChange(date) {

        setSelectedDate(date);

        var currentYear = moment().format("YYYY")
        var userBirthYear = moment(date).format("YYYY")
        var age = Math.abs(currentYear - userBirthYear)
        
        setAge(age)
    }


    async function uploadImage(imageUri) {



        try {
          const response = await fetch(imageUri)
          const blobFile = await response.blob()
      
          const reference = ref(storage, `${currentUser?.userID}.jpg`)
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
      setImage(result.uri);
    }
  };

  const handleSaveProfile = async () => {

    if(currentUser){
        const userRef = doc(db, "users", currentUser?.userID);

        if(image){
            uploadImage(image).then(async url => {
                await updateDoc(userRef, {
                    userProfile: url,
                    userName: name,
                    userPhone: phone,
                    userWhatsapp: whatsapp,
                    userGender: value,
                    userDob: moment(selectedDate).toISOString(),
                    userAge: age
                });

                console.log('updated document')

                //Update user profile in firebase authentication
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: url
                }).then(() => {
                    navigation.navigate("ProfileScreen")
                    console.log('updated profile')
                }).catch((error) => {
                    console.log(error)
                });
            })
        }
        else{
            await updateDoc(userRef, {
                userName: name,
                userPhone: phone,
                userWhatsapp: whatsapp,
                userGender: value,
                userDob: moment(selectedDate).toISOString(),
                userAge: age
            });

            console.log('updated document')

            //Update user profile in firebase authentication
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                navigation.navigate("ProfileScreen")
                console.log('updated profile')
            }).catch((error) => {
                console.log(error)
            });
        }

    }
  }

  return (
    <View style={styles.container}>
        {image ? 
            <Image source={{ uri: image }} resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }}/>
                :
            <Image resizeMode='cover' style={{aspectRatio: 1, width: '40%', borderWidth: '2px', borderRadius: '100%' }} source={{
            uri: currentUser?.userProfile
            }}/>
        }
        <Button title="Choose an Image" onPress={pickImage} />

        <View style={styles.content}>
            <View style={{padding: 0}}>
                <Text style={{paddingVertical: 5}}>Username:</Text>
                <TextInput style={styles.textInput} onChangeText={setName} value={name}></TextInput>
            </View>

            <View style={{zIndex: 1000}}>
                <Text style={{paddingVertical: 5}}>Date Of Birth:</Text>
                <DatePicker style={styles.textInputDob}
                    selected={selectedDate} 
                    onChange={(date) => handleDateChange(date)}
                    dateFormat="dd/MM/yyyy" 
                    maxDate={new Date()} 
                    showYearDropdown
                    showMonthDropdown
                />
            </View>

            <View style={{flexDirection: 'row', gap: 10, zIndex: 999}}>
            
            <View style={{padding: 0}}>
                <Text style={{paddingVertical: 5}}>Age:</Text>
                <Text style={styles.textInputAge}>{age ? age : 0}</Text>
            </View>

            <View>
                <Text style={{paddingVertical: 5}}>Gender:</Text>
                <DropDownPicker style={styles.textInputGender}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    />
            </View>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Email:</Text>
              <Text>{currentUser?.userEmail}</Text>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Phone No:</Text>
              <TextInput style={styles.textInput} value={phone} onChangeText={setPhone} keyboardType='numeric' textContentType='telephoneNumber'></TextInput>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
              <TextInput style={styles.textInput} value={whatsapp} onChangeText={setWhatsapp} keyboardType='numeric' textContentType='telephoneNumber'></TextInput>
            </View>

        </View>
        
        <TouchableOpacity onPress={()=> { handleSaveProfile() }} style={styles.saveButton}>
            <Text style={{color:'#ffffff', fontSize: '20px', fontWeight: '500'}}>SAVE</Text>
        </TouchableOpacity>
      
    </View>
  );



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
        gap: 20
      },
    
      flexDirection: {
        flexDirection: 'row',
        gap: 15,
      },

      content: {
        paddingVertical: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
      },

      textInput:{
        borderWidth: 1,
        borderColor: '#401F02',
        paddingLeft: 5,
        backgroundColor: 'white',
        height: 21
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

      textInputAge:{
        borderWidth: 1,
        borderColor: '#401F02',
        paddingLeft: 5,
        backgroundColor: 'white',
        height: 21,
        width: 70
      },
    
      textInputGender:{
        borderWidth: 1,
        borderColor: '#401F02',
        paddingLeft: 5,
        backgroundColor: 'white',
        height: 21,
        width: 90,
        
      },
    
      textInputDob:{
        borderWidth: 1,
        borderColor: '#401F02',
        paddingLeft: 5,
        backgroundColor: 'white',
        height: 21,
        width: 90
      }
    
  })
  

export default EditProfile;


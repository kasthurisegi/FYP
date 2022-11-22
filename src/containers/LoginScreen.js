import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FirebaseConfig';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const LoginScreen = () => {

  const navigation = useNavigation();

  /////// Gender Picker /////
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);

  /////////// Date Picker //////////
  const [selectedDate, setSelectedDate] = useState("");

  /////////// Age Auto Fill Function //////////
  const [age, setAge] = useState("")

  function handleDateChange(date) {setSelectedDate(date);

    var currentYear = moment().format("YYYY")
    var userBirthYear = moment(date).format("YYYY")
    var age = Math.abs(currentYear - userBirthYear)
    
    setAge(age)
  }

  /////////// Login Function //////////
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  function SignIn() {

      signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
          console.log('Signed In')
        })
        .catch((error) => {
          const err = error.message;
          const one = err.replace('Firebase: Error', '')
          const two = one.replace('(auth/', '')
          const three = two.replace(').', '')
          const newErr = three.replace('-', ' ')
          setErrMessage(newErr)
        });
  }

  /////////// Sign up Function //////////
  const [isSignUp, setIsSignUp] = useState (false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  function SignUp() {
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword,signUpConfirmPassword)
    .then((userCredential) => {
      console.log('Signed Up')
    })
    .catch((error) => {
      const err = error.message;
      const one = err.replace('Firebase: Error', '')
      const two = one.replace('(auth/', '')
      const three = two.replace(').', '')
      const newErr = three.replace('-', ' ')
      setRegisterErrorMessage(newErr)
    });
  }



////// Sign in page //////
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageContainer} source={require('../assets/SigninBackground.jpg')}>
        { isSignUp === false ?
        <View style={styles.subContainer}>
          <View style={{padding: 0}}>
            <Text style={{paddingVertical: 5, fontSize: 20, fontWeight:'800' , color:'#401F02'}}>Roomarch</Text>
          </View> 

          <View style={{padding: 0}}>
            <Text style={{paddingVertical: 5}}>Email:</Text>
            <TextInput style={styles.textInput} onChangeText={setSignInEmail}></TextInput>
          </View>

          <View style={{padding: 0}}>
            <Text style={{paddingVertical: 5}}>Password:</Text>
            <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setSignInPassword}></TextInput>
          </View>
          {errMessage !== "" && <Text>{errMessage}</Text>}

          <View style={{padding: 0}}>
            <TouchableOpacity style={styles.signInButton} onPress={()=> SignIn() } >
              <Text style={{color:'#FFFFFF'}}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={{padding: 0, flexDirection: 'row'}}>
              <Text style={{color:'#000000'}}>New User?</Text>
              <TouchableOpacity style={{}} onPress={() => {
                setIsSignUp(true)
              }}>
              <Text style={{paddingLeft: 5, color:'#0A1172'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{padding: 0}}>
            <TouchableOpacity style={{}}>
              <Text style={{ color:'#0A1172'}}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>


        :

////// sign up page //////
        <View style={styles.signUpContainer}>
          <View style={{height: '10%', width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            
            <View style={{width: '40%'}}>
              <TouchableOpacity onPress={() => { setIsSignUp(false)}}>
              <AntDesignIcon name={'arrowleft'} size={25} style={{paddingLeft: 5}}/>
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight:'bold', fontSize:'20px'}}>Sign Up</Text>
            </View>

          </View>
          <View style={{height: '90%', alignItems: 'center', justifyContent: 'space-evenly'}}>
            
            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Name:</Text>
              <TextInput style={styles.textInput}></TextInput>
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
              <TextInput style={styles.textInput} keyboardType='email-address' onChangeText={setSignUpEmail}></TextInput>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Phone No:</Text>
              <TextInput style={styles.textInput} keyboardType='number-pad' textContentType='telephoneNumber'></TextInput>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Whatsapp No:</Text>
              <TextInput style={styles.textInput} keyboardType='number-pad' textContentType='telephoneNumber'></TextInput>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Password:</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setSignUpPassword}></TextInput>
            </View>

            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Confirm Password:</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setSignUpConfirmPassword}></TextInput>
            </View>

            <View style={{padding: 15}}>
              <TouchableOpacity style={styles.signUpButton} onPress={() => { SignUp() }}>
                <Text style={{color:'#FFFFFF'}}>Sign Up</Text>
              </TouchableOpacity>
              {registerErrorMessage !== "" && <Text>{registerErrorMessage}</Text>}
            </View>
          </View>
        </View>
        }
      </ImageBackground>
    </View>
  )
}


////// CSS ///////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },

  subContainer: {
    width: '50%',
    height: '40%',
    alignItems: "center",
    justifyContent: 'space-evenly',
    backgroundColor: '#FFEDDD',
    borderColor: '#401f02',
    borderWidth: 1,
    borderRadius: 15
  },

  signInButton: {
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

  signUpButton: {
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

  signUpContainer: {
    width: '70%',
    height: '95%',
    alignItems: "center",
    justifyContent: 'space-evenly',
    backgroundColor: '#FFEDDD',
    borderColor: '#401f02',
    borderWidth: 1,
    borderRadius: 15
  },

  textInput:{
    borderWidth: 1,
    borderColor: '#401F02',
    paddingLeft: 5,
    backgroundColor: 'white',
    height: 21
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
});


export default LoginScreen
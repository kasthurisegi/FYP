import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FirebaseConfig';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDownPicker from 'react-native-dropdown-picker';


const LoginScreen = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);

  const [openNum, setOpenNum] = useState(false);
  const [valueNum, setValueNum] = useState(null);
  const [itemsNum, setItemsNum] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '31', value: '31'},
    {label: '32', value: '32'},
    {label: '33', value: '33'},
    {label: '34', value: '34'},
    {label: '35', value: '35'},
    {label: '36', value: '36'},
    {label: '37', value: '37'},
    {label: '38', value: '38'},
    {label: '39', value: '39'},
    {label: '40', value: '40'},
    {label: '41', value: '41'},
    {label: '42', value: '42'},
    {label: '43', value: '43'},
    {label: '44', value: '44'},
    {label: '45', value: '45'},
    {label: '46', value: '46'},
    {label: '47', value: '47'},
    {label: '48', value: '48'},
    {label: '49', value: '49'},
    {label: '50', value: '50'},
    {label: '51', value: '51'},
    {label: '52', value: '52'},
    {label: '53', value: '53'},
    {label: '54', value: '54'},
    {label: '55', value: '55'},
    {label: '56', value: '56'},
    {label: '57', value: '57'},
    {label: '58', value: '58'},
    {label: '59', value: '59'},
    {label: '60', value: '60'},
    
  ]);

const [isSignUp, setIsSignUp] = useState (false);

const [selectedDate, setSelectedDate] = useState("");

const [signInEmail, setSignInEmail] = useState("");
const [signInPassword, setSignInPassword] = useState("");
const [errMessage, setErrMessage] = useState("");
const [registerErrorMessage, setRegisterErrorMessage] = useState("");

const [signUpEmail, setSignUpEmail] = useState('');
const [signUpPassword, setSignUpPassword] = useState('');

const navigation = useNavigation();

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

function SignUp() {
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
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
            <View style={{zIndex: 999}}>
              <Text style={{paddingVertical: 5}}>Date Of Birth:</Text>
              <DatePicker selected={selectedDate} 
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="dd/MM/yyyy" 
                          maxDate={new Date()} 
                          showYearDropdown
                          showMonthDropdown
                          />
            </View>
            <View style={{flexDirection: 'row', gap: 1, zIndex: 999}}>
                <View>
                  <Text style={{paddingVertical: 5}}>Gender:</Text>
                  <DropDownPicker style={{
                                  backgroundColor: "white",
                                  borderWidth: 1,
                                  borderColor: '#401F02'
                                  }}
                                  open={open}
                                  value={value}
                                  items={items}
                                  setOpen={setOpen}
                                  setValue={setValue}
                                  setItems={setItems}
                                  />
                </View>
                <View style={{padding: 0}}>
                  <Text style={{paddingVertical: 5}}>Age:</Text>
                  <DropDownPicker style={{
                                  backgroundColor: "white",
                                  borderWidth: 1,
                                  borderColor: '#401F02'
                                  }}
                                  open={openNum}
                                  value={valueNum}
                                  items={itemsNum}
                                  setOpen={setOpenNum}
                                  setValue={setValueNum}
                                  setItems={setItemsNum}
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
              <Text style={{paddingVertical: 5}}>Password:</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setSignUpPassword}></TextInput>
            </View>
            <View style={{padding: 0}}>
              <Text style={{paddingVertical: 5}}>Confirm Password:</Text>
              <TextInput style={styles.textInput} secureTextEntry={true}></TextInput>
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
    height: '90%',
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
  }
});


export default LoginScreen
import { View, Text, StyleSheet, Image,TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons'
import { DataProcessorContext } from '../context/DataProcessor'

const RoommateDetails = () => {

// page navagation
const navigation = useNavigation();

const {
    selectedRoommate
  } = useContext(DataProcessorContext);

  return (
    <View>
        {selectedRoommate &&
            <Text>{selectedRoommate.name}</Text>
        }
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
  },


})

export default RoommateDetails
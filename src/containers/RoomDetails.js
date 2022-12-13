import { View, Text, StyleSheet, Image,TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons'
import { DataProcessorContext } from '../context/DataProcessor'

const RoomDetails = () => {

// page navagation
const navigation = useNavigation();

const {
    selectedRoom
  } = useContext(DataProcessorContext);

  return (
    <View>
        {selectedRoom &&
            <Text>{selectedRoom.name}</Text>
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

export default RoomDetails
import { SafeAreaView,StyleSheet, ScrollView, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import react, {useState} from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { WhatsAppOutlined } from '@ant-design/icons'

const images = [
  'https://cdn-prod.medicalnewstoday.com/content/images/articles/321/321450/stressed-woman-at-work.jpg',
  'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/05/10WaysToEaseStress-1166219231-770x533-1.jpg',
  'https://www.popsci.com/uploads/2021/10/05/AUA_stress.jpg',
]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const RoomViewPostScreen = () => {
  const [imageActive, setimageActive] = useState(0)

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imageActive) {setimageActive(slide)}
    }
  }

  return (

   <View style={styles.mainContainer}>
      <View style= {styles.displayContainer}>
        <View style= {styles.cardContainer}>

          <SafeAreaView style= {styles.carouselContainer}>
              <View style= {styles.wrap}>
              <ScrollView
                onScroll={({nativeEvent}) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
                >

                {
                  images.map((e, index) => 
                  <Image 
                    key={e}
                    resizeMode='cover'
                    style={styles.wrap}
                    source={{uri: e}}
                    />
                  )
                }

              </ScrollView>
                <View style={styles.wrapDot}>
                  {
                    images.map((e, index) =>
                    <Text 
                    key={e} 
                    style={imageActive == index ? styles.dotActive : styles.dot}
                    >●</Text>
                    )
                  }
                </View>
              </View>
          </SafeAreaView>

        <View style={styles.detailsContainer}>
        <View style={styles.profilePictureContainer}>
          <Image resizeMode='cover' style={{aspectRatio: 1, width: '100%', borderWidth: '2px', borderRadius: '100%' }} source={require('../assets/room.jpg')}></Image>
          </View>
        <View style={styles.profileInfoContainer} >
          <View style={styles.upperContainer} >
            <View style={styles.usernameContainer}>
                <Text style={{fontSize: '13px', fontWeight: "700"}}>Robert Fox</Text>
                  <View style={styles.userAgeContainer}>
                    <Text style={{fontSize: '12px'}}>31</Text>
                    <Text style={{fontSize: '12px'}}>,</Text>
                    <Text style={{fontSize: '12px'}}>Male</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: '12px', fontWeight: "600"}}>City</Text>
                  </View>
            </View>
            <View style={styles.amountContainer}>
                <Text style={{fontSize: '16px', fontWeight: "800"}}>RM100</Text>
                <Text style={{fontSize: '10px'}}>/</Text>
                <Text style={{fontSize: '10px'}}>Month</Text>
            </View>
          </View>
          <View style={styles.belowContainer}>
          <Text style={{fontSize: '10px', paddingTop: '10px'}}> 
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
            Velit officia consequat duis enim velit mollit. 
            Exercitation veniam consequat.
          </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
              <AntDesignIcon name={'hearto'} size={25} style={{}}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <WhatsAppOutlined style={{ fontSize: '25px', color: '#25D366' }}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{
              width: 100, 
              height: 30, 
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
            }}>
              <Text style={{color:'#FFFFFF'}}>View Details</Text>
            </TouchableOpacity>

          </View>
        </View>
        </View> 
        </View>
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
      },

      cardContainer: {
          flexDirection: 'column',
          width: '90%',
          height: '70%',
          backgroundColor: '#FFEDDD',
          shadowRadius: '10px',
          borderRadius: '20px',
          padding: '10px',
      },

      carouselContainer: {
        flex: 0.85,
        alignItems: 'center',
      },

      wrap: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.25,
        borderRadius: '20px',
      },

      wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
      },
      
      dotActive: {
        margin: 3,
        color: '#6E4119',
      },

      dot: {
        margin: 3,
        color: '#F3C296',

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
  }
)


export default RoomViewPostScreen
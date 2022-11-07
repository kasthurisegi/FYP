import { SafeAreaView,StyleSheet, ScrollView, View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import react, {useState} from 'react'

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
      <View style= {styles.displayContainer}>
        <View style= {styles.cardContainer}>

          <SafeAreaView style= {styles.container}>
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

          <View style={styles.profileImageContainer}>
          <Image resizeMode='cover' style={{aspectRatio: 1, width: '25%', borderWidth: '2px', borderRadius: '100%' }} source={require('../assets/room.jpg')}></Image>
          </View>

        </View>
      </View>
  )
}

const styles = StyleSheet.create({


      displayContainer: {
        flex: 1,
        display: "flex",
        paddingVertical: "30px",
        alignItems: 'center',
      },

      cardContainer: {
          flexDirection: 'column',
          width: '90%',
          height: '60%',
          backgroundColor: '#FFEDDD',
          shadowRadius: '10px',
          borderRadius: '20px',
          padding: '10px',
      },

      container: {
        flex: 0.6,
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
      profileImageContainer: {
        flex: 0.25,
        justifyContent: 'center',
        paddingLeft: '10px',
      },
  }
)


export default RoomViewPostScreen
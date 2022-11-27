import React, { useState, useContext } from 'react';
import LoginScreen from './src/containers/LoginScreen';
import HomeScreen from './src/containers/HomeScreen';
import AddRoommateScreen from './src/containers/AddRoommateScreen';
import AddRoomScreen from './src/containers/AddRoomScreen';
import RoommateViewPostScreen from './src/containers/RoommateViewPostScreen';
import RoomViewPostScreen from './src/containers/RoomViewPostScreen';
import FavouriteScreen from './src/containers/FavouriteScreen';
import ProfileScreen from './src/containers/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { UserInfoContext } from './src/context/userInfoContext';
import EditProfile from './src/containers/EditProfile';
import RoommateDetails from './src/containers/RoommateDetails';
import RoomDetails from './src/containers/RoomDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginScreenStack() {
    return(
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

function HomeStack() {
  return (
      <Stack.Navigator >
        

        <Stack.Screen  
          name="HomeScreen" 
          component={HomeScreen} 
          options={{headerShown: false}}/>

        <Stack.Screen  
          name="RoommateViewPostScreen" 
          component={RoommateViewPostScreen} 
          options={{title: 'Find Roommate',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#D6B598',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                    },
                    }}/>

        <Stack.Screen  
          name="RoommateDetails" 
          component={RoommateDetails} 
          options={{title: 'Roommate Details',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#D6B598',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                    },
                    }}/>

        <Stack.Screen  
        name="RoomViewPostScreen" 
        component={RoomViewPostScreen} 
        options={{title: 'Find Room',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#D6B598',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                  },
                  }}/>

        <Stack.Screen  
          name="RoomDetails" 
          component={RoomDetails} 
          options={{title: 'Room Details',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#D6B598',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      fontSize: '24px',
                      fontWeight: 'bold',
                    },
                    }}/>

        <Stack.Screen  
        name="AddRoommateScreen" 
        component={AddRoommateScreen} 
        options={{title: 'Add Post',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#D6B598',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    },
                    }}/>

        <Stack.Screen  
        name="AddRoomScreen" 
        component={AddRoomScreen} 
        options={{title: 'Add Post',
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#D6B598',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                    },
                    }}/>

      </Stack.Navigator>
    
  );
}

function FavouriteStack() {
  return (
      <Stack.Navigator >
        <Stack.Screen  
        name="FavouriteScreen" 
        component={FavouriteScreen} 
        options={{title: 'Favourite', 
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#D6B598',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }, 
                  }}/>
      </Stack.Navigator>
    
  );
}
function ProfileStack() {
  return (
      <Stack.Navigator >
        <Stack.Screen  
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{title: 'Profile', 
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#D6B598',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }, 
                  }}/>
      <Stack.Screen  
        name="EditProfile" 
        component={EditProfile} 
        options={{title: 'Edit Profile', 
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#D6B598',
                  },
                  headerTintColor: '#000000',
                  headerTitleStyle: {
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }, 
                  }}/>
      </Stack.Navigator>
    
  );
}

function Index() {

const { loginState } = useContext(UserInfoContext);

  return (
    <NavigationContainer>
        {loginState ?
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({ 
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {

                let iconName;

                if (route.name === 'Home') {
                    iconName = "home"
                } else if (route.name === 'Favourite') {
                    iconName = "star"
                } else if (route.name === 'Profile') {
                    iconName = "person"
                };
                
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                        
            },
            tabBarActiveTintColor: '#6E4119',
            tabBarInactiveTintColor: 'black',
            tabBarInactiveBackgroundColor: '#FFEDDD',
            tabBarActiveBackgroundColor: '#D6B598',
            
            })}
        >
                <Tab.Screen name="Favourite" component={FavouriteStack} />
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Profile" component={ProfileStack} />
                
            
        </Tab.Navigator>
        :
        <Stack.Navigator>
            <Stack.Screen name='LoginScreenStack' component={LoginScreenStack}  options={{ headerShown: false }}/>
        </Stack.Navigator>
        }
    </NavigationContainer>
  )
}

export default Index
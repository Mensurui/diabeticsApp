import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import Profile from '../Screens/Profile';
// import Details from '../Screens/Details';
import Settings from '../Screens/Settings';
import { SafeAreaView } from 'react-native';
import History from '../Screens/History';
import Chat from '../Screens/Chat';

const Tab = createBottomTabNavigator();

function MainTabNavigator({ setUserToken }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }else if (route.name === 'History') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }

          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#153E31',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profile" component={Profile} initialParams={{setUserToken}}/>
      <Tab.Screen name="History" component={History}  />
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ setUserToken }} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    </SafeAreaView>
  );
}

export default MainTabNavigator;

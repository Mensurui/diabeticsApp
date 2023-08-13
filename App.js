import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './Navigations/AuthStack';
import MainTabNavigator from './Navigations/MainTabNavigator';
import SplashScreen from './Screens/SplashScreen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const getUserToken = async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      await sleep(2000);
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {userToken == null ? (
          <AuthStack setUserToken={setUserToken} />
        ) : (
          <MainTabNavigator setUserToken={setUserToken} />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}







/*Tab Navigator*/
/*
import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

function Details() {
  return (
    <View>
      <Text>Details Screen Page</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        title='Details'
        onPress={() => {
          navigation.navigate('Details');
        }}
        color='grey'
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title='Details'
        onPress={() => {
          navigation.navigate('Details');
        }}
        color='grey'
      />
    </View>
  );
}

function NotificationScreen(){
  return(
    <View>
      <Text>Notification</Text>
      </View>
  )
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name=' ' component={HomeScreen} />
      <HomeStack.Screen name='Details' component={Details} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name=' ' component={SettingsScreen} />
      <SettingsStack.Screen name='Details' component={Details} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // Uncomment the following lines to customize tab bar icons and colors
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'list-outline' : 'list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        Hide the header for all screens
        // screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen}  />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
      <Drawer.Navigator>
        <Drawer.Navigator name="Home" component={HomeScreen}/>
        <Drawer.Navigator name="Notification" component={NotificationScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}*/

/*Drawer Navigator*/
/*function Details() {
  return (
    <View>
      <Text>Details Screen Page</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const isDrawerOpen = useDrawerStatus();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button
        title='Details'
        onPress={() => {
          navigation.navigate('Details');
        }}
        style={isDrawerOpen ? styles.greenButton : styles.redButton}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title='Details'
        onPress={() => {
          navigation.navigate('Details');
        }}
        color='grey'
      />
    </View>
  );
}

function NotificationScreen() {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name=' ' component={HomeScreen} />
      <HomeStack.Screen name='Details' component={Details} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name='Settings' component={SettingsScreen} />
      <SettingsStack.Screen name='Details' component={Details} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeStackScreen} />
        <Drawer.Screen name='Notification' component={NotificationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = {
  greenButton: {
    backgroundColor: 'green',
  },
  redButton: {
    backgroundColor: 'red',
  },
};*/
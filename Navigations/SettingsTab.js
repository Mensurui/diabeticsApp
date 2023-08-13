import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountSettings from '../Screens/AccountSettings';
import SettingsHome from '../Screens/SettingsHome';
import Privacy from '../Screens/Privacy';

const Stack = createNativeStackNavigator(); 

export default function SettingsTab(){
    return(
        <Stack.Navigator initialRouteName='Settings Home' >
            <Stack.Screen name=' ' component={SettingsHome} options={{headerShown:false}}/>
            <Stack.Screen name='Account Settings' component={AccountSettings}/>
            <Stack.Screen name='Privacy' component={Privacy}/>
        </Stack.Navigator>
    )
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SimpleSignInScreen from '../Screens/SimpleSignInScreen';
import SimpleSignUpScreen from '../Screens/SimpleSignUpScreen';
import ResetPassword from '../Screens/ResetPassword';

const Stack = createNativeStackNavigator();

function AuthStack({ setUserToken }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign-In"
        component={SimpleSignInScreen}
        options={{
          title: '',
        }}
        initialParams={{ setUserToken }}
      />
      <Stack.Screen name="Sign-Up" component={SimpleSignUpScreen} initialParams={{ setUserToken }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default AuthStack;

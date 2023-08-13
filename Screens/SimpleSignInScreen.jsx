import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../firebase';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithCredential } from 'firebase/auth';
import Injection from '../icons/Injection';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// WebBrowser.maybeCompleteAuthSession();



function SimpleSignInScreen({ navigation, route }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { setUserToken } = route.params;

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId: '"861982546272-0a8fl1q6fanik9i62r4t23tgr79qoiph.apps.googleusercontent.com"',
  // });

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithGoogle(credential);
  //   }
  // }, [response]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     if (user) {
  //       console.log(user.toJSON());
  //     } else {
  //       console.log('error');
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  // const signInWithGoogle = async (credential) => {
  //   try {
  //     const userCredential = await signInWithCredential(FIREBASE_AUTH, credential);
  //     const { user } = userCredential;
  //     console.log(user.toJSON());
  //     setUserToken(user.uid);
  //   } catch (error) {
  //     console.log(error);
  //     alert('Could not sign in with Google.');
  //   }
  // };

  const signInWithEmailAndPasswordHandler = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log(response);
      setUserToken(response.user.uid);
    } catch (e) {
      console.log(e);
      alert('Could not sign in with email and password');
    } finally {
      setLoading(false);
    }
  };

  return (
      <ScrollView>
    <View style={styles.container}>
      <Injection/>
      <TextInput
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        placeholder='Email address'
      />
      <TextInput
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
       <TouchableOpacity style={styles.signInButton} onPress={signInWithEmailAndPasswordHandler}>
        <Text style={styles.buttonText}>Sign-In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Sign-Up')} >
        <Text style={styles.buttonText}>Sign-Up</Text>
      </TouchableOpacity>  
      {/* <Button title="Sign-up with Google" onPress={() => promptAsync()} /> */}
    </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    marginTop:100,
    marginLeft:-10
  },
  signInButton: {
    backgroundColor: '#84B4E8', // Set your desired button background color
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    marginBottom:10,
  },
  buttonText: {
    color: '#ffffff', // Set your desired button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderTopColor: '#f0f0f0',
    borderLeftColor: '#f0f0f0',
    borderRightColor: '#f0f0f0',
    borderBottomColor:'#000000', 
    padding: 10,
  },
});

export default SimpleSignInScreen;
// androidClientId:
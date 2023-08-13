import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';
import { TouchableOpacity } from 'react-native';

function SimpleSignUpScreen({ route }) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const { setUserToken } = route.params;

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      const userDocRef = doc(FIREBASE_DB, 'users', response.user.uid);
      await setDoc(userDocRef, {
        firstName,
        lastName,
        email,
        userName,
        
      });
      setUserToken(response.user.uid);
    } catch (e) {
      console.log(e);
      if (email === '') {
        alert('Please enter your email');
      } else if (password === '') {
        alert('Please enter your password');
      } else if (password !== confirmPassword) {
        alert("Passwords don't match");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="User Name"
      />
      <TextInput
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="New Password"
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        placeholder="Confirm Password"
      />
      <TouchableOpacity style={styles.signInButton} onPress={signUp}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginTop: -200,
    marginLeft: -10,
  },
  signInButton: {
    backgroundColor: '#84B4E8',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
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
    borderBottomColor: '#000000',
    padding: 10,
  },
});

export default SimpleSignUpScreen;

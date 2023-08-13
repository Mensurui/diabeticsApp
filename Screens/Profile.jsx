import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Card } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebase from 'firebase/compat';
import { Table, Row } from 'react-native-table-component';
import { ScrollView } from 'react-native';
import { StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'react-native';

function formatDate(timestamp) {
  const dateObject = new Date(timestamp);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return isNaN(dateObject) ? 'Invalid Date' : daysOfWeek[dateObject.getDay()];
}


const predefinedImages = [
  'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/13-Captain-512.png',
  'https://cdn2.iconfinder.com/data/icons/avatars-60/5985/33-Son-512.png'
  // Add more image URLs as needed
];

function Profile({route}) {
  const [userName, setUserName] = useState(null);
  const [image, setImage] = useState(null);
  const [morningSugarLevels, setMorningSugarLevels] = useState([]);
  const [nightSugarLevels, setNightSugarLevels] = useState([]);
  const [dates, setDates] = useState([]);
  const { setUserToken } = route.params;

  
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeButtonStyle = colorScheme === 'light' ? styles.lightButton : styles.darkButton;
  const themeTableStyle = colorScheme === 'light' ? styles.lightTable : styles.darkTable;


  useEffect(() => {
    const fetchUserData = async () => {
      const firestore = firebase.firestore();
      try {
        const uid = FIREBASE_AUTH.currentUser.uid;
        const userDocRef = firestore.collection('users').doc(uid);

        // Use onSnapshot to listen for changes in the user document
        userDocRef.onSnapshot((docSnapshot) => {
          if (docSnapshot.exists) {
            const userData = docSnapshot.data();
            setUserName(userData.userName);
          } else {
            setUserName(null);
          }
        });

        const morningSugarLevelRef = firestore.collection('users').doc(uid).collection('sugarLevelMeasurements');
        const nightSugarLevelRef = firestore.collection('users').doc(uid).collection('sugarLevelMeasurements');
        const dateRef = firestore.collection('users').doc(uid).collection('sugarLevelMeasurements');

        // Use onSnapshot to listen for changes in the sugar level measurements collections
        morningSugarLevelRef.onSnapshot((morningSugarSnapshot) => {
          const morningSugarDataArray = morningSugarSnapshot.docs.map((doc) => doc.data());
          morningSugarDataArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          const morningFirstSevenEntries = morningSugarDataArray.slice(0, 7);
          const morningSugarLevels = morningFirstSevenEntries.map((entry) => entry.morningSugarLevel);
          setMorningSugarLevels(morningSugarLevels);
        });

        nightSugarLevelRef.onSnapshot((nightSugarSnapshot) => {
          const nightSugarDataArray = nightSugarSnapshot.docs.map((doc) => doc.data());
          nightSugarDataArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          const nightFirstSevenEntries = nightSugarDataArray.slice(0, 7);
          const nightSugarLevels = nightFirstSevenEntries.map((entry) => entry.nightSugarLevel);
          setNightSugarLevels(nightSugarLevels);
        });

        dateRef.onSnapshot((dateSnapshot) => {
          const dateDataArray = dateSnapshot.docs.map((doc) => doc.data());
          dateDataArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          const dateFirstSevenEntries = dateDataArray.slice(0, 7);
          const date = dateFirstSevenEntries.map((entry) => formatDate(entry.date));
          setDates(date);
        });
        const pictureCollectionRef = firestore.collection(`users/${uid}/picture`);
        const querySnapshot = await pictureCollectionRef.get();
        const pictureDocSnapshot = querySnapshot.docs[0];
        if (pictureDocSnapshot) {
          const pictureData = pictureDocSnapshot.data();
          const imageUrl = pictureData.url;
          setImage(imageUrl);
        } else {
          setImage(null); // No picture found for the user
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setUserName(null);
      }
    };

    fetchUserData();
  }, []);

  async function pickImage() {
    try {
      // Instead of launching the image picker, show your predefined images to the user
      let chosenImageUrl = await showPredefinedImages();

      // Upload the chosen image
      if (chosenImageUrl) {
        setImage(chosenImageUrl);
        await saveRecord(chosenImageUrl); // Save the chosen image URL to the database
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function showPredefinedImages() {
    return new Promise((resolve) => {
      // For simplicity, we will use a simple alert with buttons for demonstration purposes
      const buttons = predefinedImages.map((imageUrl) => ({
        text: imageUrl,
        onPress: () => resolve(imageUrl),
      }));

      buttons.push({ text: 'Cancel', onPress: () => resolve(null) });

      // Show an alert with buttons for each predefined image
      Alert.alert('Choose an Image', 'Select an image from the list', buttons);
    });
  }

  async function saveRecord(url) {
    const firestore = firebase.firestore();
    try {
      const uid = FIREBASE_AUTH.currentUser.uid;
      const docRef = await firestore.collection(`users/${uid}/picture`).add({
        url,
      });
      console.log('Document saved correctly', docRef.id);
    } catch (e) {
      console.error('Error saving record:', e);
    }
  }

  // async function uploadImage(uri) {
  //   try {
  //     const blob = new Blob([uri], { type: 'image/jpeg' });
  //     const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${new Date().getTime()}`);
  //     const uploadTask = uploadBytesResumable(storageRef, blob);

  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload progress: ' + progress + '%');
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           console.log('File available at', downloadURL);
  //           // save record
  //           await saveRecord(downloadURL);
  //           setImage('');
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // async function saveRecord(url) {
  //   const firestore = firebase.firestore();
  //   try {
  //     const uid = FIREBASE_AUTH.currentUser.uid;
  //     const docRef = await firestore.collection(`users/${uid}/picture`).add({
  //       url,
  //     });
  //     setImage(url);
  //     console.log('Document saved correctly', docRef.id);
  //   } catch (e) {
  //     console.error('Error saving record:', e);
  //   }
  // }
  
  return (
    <ScrollView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#C4DFDF" barStyle="dark-content" />
      <View style={[styles.container, themeContainerStyle]}>
      <StatusBar/>
          <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              ) : (
                <Ionicons name="person" size={30} />
              )}
            </TouchableOpacity>
          </View>
        <Card>
          <View>
            <Text style={{backgroundColor:"#00000000"}}>{userName}</Text>
          </View>
        </Card>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 25 }}>This week's sugar level</Text>

            <Table style={[styles.table, themeTableStyle]}>
              <Row data={['Date', 'Morning Sugar Level', 'Night Sugar Level']} style={{ height: 80, backgroundColor: '#7791AD' }} textStyle={{ margin: 6 }} />
              {morningSugarLevels.map((level, index) => (
                <Row key={index} data={[dates[index], level, nightSugarLevels[index]]} style={{ height: 50 }} textStyle={{ margin: 6 }} />
              ))}
            </Table>
          </View>
          <TouchableOpacity onPress={() => {
          setUserToken(null); 
        }} style={[styles.signInButton, themeButtonStyle]}>
            <Text style={styles.darkThemeText}>Sign-Out</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    padding: 10,
    marginLeft:15,
    borderRadius: 5,
    width: 382,
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    color: '#000000', // Set your desired button text color
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Added alignSelf to center the TouchableOpacity itself
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  lightContainer: {
    backgroundColor: '#E3F4F4',
  },
  darkContainer: {
    backgroundColor: '#83AAAA',
  },
  lightThemeText: {
    color:'#FFFFFF',
  },
  darkThemeText: {
    color: '#FFFFFF',
  },
  lightButton: {
    backgroundColor: '#273C53', 
    width: 1000,
  },
  darkButton: {
    backgroundColor: '#90B4DD', 
    width: 1000
  },
  table:{
    borderWidth: 1, 
    width: 400
  },
  lightTable:{
    backgroundColor:'#BCDFE3'
  },
  darkTable:{
    backgroundColor:'#A9CACA'
  },
  text:{
    color:'#000000'
  }
})

export default Profile;

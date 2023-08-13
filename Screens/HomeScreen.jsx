import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import WelcomeCard from './Cards/WelcomeCard';
import Insulin from './Cards/Insulin';
import SugarLevel from './Cards/SugarLevel';
import { FIREBASE_AUTH } from '../firebase';
import firebase from 'firebase/compat';

function HomeScreen({ route }) {
  const { setUserToken } = route.params;
  const [userName, setUserName] = useState(null);
  const [country, setCountry] = useState('Unknown'); // Set a default value

  useEffect(() => {
    const fetchUserData = async () => {
      const firestore = firebase.firestore();
      try {
        const uid = FIREBASE_AUTH.currentUser.uid;
        
        const userDocRef = firestore.collection('users').doc(uid);
        const docSnapshot = await userDocRef.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          setUserName(`${userData.firstName} `);
        } else {
          setUserName(null);
        }

        const countryRef = firestore.collection('users').doc(uid).collection('userCountries');
        countryRef.onSnapshot((countrySnapshot) => {
          const countryDataArray = countrySnapshot.docs.map((doc) => doc.data());
          if (countryDataArray.length > 0) {
            const countryChoice = countryDataArray[0].country; // Assuming the country field exists
            setCountry(countryChoice);
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setUserName(null);
        setCountry('Unknown');
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#E3F4F4' }}>
      <StatusBar backgroundColor="#4D94AC" barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <WelcomeCard userName={userName} country={country} />
        <Insulin />
        <SugarLevel />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;





//  import React, { useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import WelcomeCard from './Cards/WelcomeCard';
// import Insulin from './Cards/Insulin';
// import SugarLevel from './Cards/SugarLevel';
// import { FIREBASE_AUTH, FIREBASE_DB } from '../firebase';

// function HomeScreen({ navigation, route }) {
//   const { setUserToken } = route.params;
//   const [userName, setUserName] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   useEffect(() => {
//     const userId = FIREBASE_AUTH.currentUser.uid;
//     // const userDocRef = FIREBASE_DB.collection('users').doc(userId);
//     const userDocRef = FIREBASE_DB.collection('users').doc(userId);

//     userDocRef.get()
//     .then((doc) => {
//       if (doc.exists){
//         const userData = doc.data();
//         setUserName(`${userData.firstName} ${userData.lastName}`);
//       }else {
//         setUserName(null);
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching user data:', error.message);
//       setUserName(null);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
//   }, [])
//   return (
//     <View style={{flex:1}}>
//     <WelcomeCard userName={userName}/>
//     <Insulin/>
//     <SugarLevel />
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//        <Button
//         title='Go to Profile'
//         onPress={() => {
//           navigation.navigate('Profile');
//         }}/>
//    <Button
//       title="Sign Out"
//       onPress={() => {
//         setUserToken(null); // Reset the userToken to null to sign out
//       }}
//     /> 
//   </View>
//   </View>
// );
// }
// // Dont forget to move this signup button to the profile area
// export default HomeScreen; 
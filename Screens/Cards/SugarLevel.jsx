import React from "react";
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, Input } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH, FIREBASE_APP } from '../../firebase';
import firebase from 'firebase/compat';
import { TouchableOpacity } from "react-native";


export default function SugarLevel(){
    const [morningSugarLevel, setMorningSugarLevel] = React.useState('');
  const [nightSugarLevel, setNightSugarLevel] = React.useState('');
  const plus = "plus"

  const addSugarLevel = async () => {
    const uid = FIREBASE_AUTH.currentUser.uid;
    console.log({
      uid: uid,
      morningSugarLevel: morningSugarLevel,
      nightSugarLevel: nightSugarLevel,
    });

    const firestore = firebase.firestore();
    try {
      const docRef = await firestore
        .collection(`users/${uid}/sugarLevelMeasurements`)
        .add({  morningSugarLevel: morningSugarLevel,
          nightSugarLevel: nightSugarLevel,
          date: new Date().toISOString(), });

      console.log('Document written with ID: ', docRef.id);
     

      // Reset the input fields after successful execution
      setMorningSugarLevel('');
      setNightSugarLevel('');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

    return(
        <View style={{backgroundColor:'#E3F4F4', paddingTop:30}}>
            <Card.Title style={{fontSize:22}}>Sugar Level</Card.Title>
            <Card.Divider/>
            <Input placeholder="Morning Sugar Level" value={morningSugarLevel} onChangeText={setMorningSugarLevel} 
            placeholderTextColor="#373F47"
            keyboardType="numeric"/>
          <Input placeholder="Night Sugar Level" value={nightSugarLevel} onChangeText={setNightSugarLevel} 
            placeholderTextColor="#373F47"
            keyboardType="numeric"/>
          <View style={styles.buttonContainer}>
          {morningSugarLevel && nightSugarLevel ? (
              <TouchableOpacity
                onPress={() => addSugarLevel()}
                style={{
                  backgroundColor: "#345268",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5
                }}
              >
                <Ionicons name="rocket" size={30} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  marginTop:5
                }}
              >
                <Ionicons name="rocket-outline" size={30} />
              </TouchableOpacity>
            )}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
    },
  });
  
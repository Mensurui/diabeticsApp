import React from "react";
import { Text, Card, Button, Input } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH, FIREBASE_APP } from "../../firebase";
import firebase from "firebase/compat";
import { TouchableOpacity } from "react-native";

export default function Insulin() {
  const [morningNeedle, setMorningNeedle] = React.useState("");
  const [nightNeedle, setNightNeedle] = React.useState("");
  const plus = "+";

  const addInsulin = async () => {
    const uid = FIREBASE_AUTH.currentUser.uid;
    console.log({
      uid: uid,
      morningNeedle: morningNeedle,
      nightNeedle: nightNeedle,
    });
    const firestore = firebase.firestore();
    try {
      const docRef = await firestore
        .collection(`users/${uid}/insulinMeasurements`)
        .add({ morningNeedle: morningNeedle, nightNeedle: nightNeedle });

      console.log("Document written with ID: ", docRef.id);

      // Reset the input fields after successful execution
      setMorningNeedle("");
      setNightNeedle("");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#D2E9E9", paddingTop:50 }}>
     
        <Card.Title style={{fontSize:22}}>Insulin Level</Card.Title>
        <Card.Divider />
        <View style={{paddingTop:10}}>
          <Input
            placeholder="Morning needle"
            value={morningNeedle}
            onChangeText={setMorningNeedle}
            placeholderTextColor="#373F47"
            keyboardType="numeric"
          />
          <Input
            placeholder="Night needle"
            value={nightNeedle}
            onChangeText={setNightNeedle}
            placeholderTextColor="#373F47"
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            {morningNeedle && nightNeedle ? (
              <TouchableOpacity
                onPress={() => addInsulin()}
                style={{
                  backgroundColor: "#345268",
                  padding: 10,
                  borderRadius: 5,
                  marginTop:5
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
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
});

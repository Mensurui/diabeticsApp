import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input } from '@rneui/base';
import DropDownPicker from 'react-native-dropdown-picker';
import { FIREBASE_AUTH } from '../firebase';
import { Button } from 'react-native';
import firebase from 'firebase/compat';

export default function AccountSettings() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [country, setCountry] = useState([]);
  const [myCountry, setMyCountry] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then((data) => {
        const countryNames = data.map(country => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountry(countryNames);
        setItems(countryNames);
        setValue(countryNames[0].value);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  };

  const handleCountryChange = (itemValue) => {
    setValue(itemValue); // Set the selected value in the DropDownPicker
    setMyCountry(itemValue); // Set the selected country in the myCountry state
  };

  const addMyCountry = async () => {
    const uid = FIREBASE_AUTH.currentUser.uid;
    console.log({
      country: myCountry,
    });
    const firestore = firebase.firestore();

    try {
      const docRef = await firestore
        .collection('users')
        .doc(uid)
        .collection('userCountries')
        .add({ country: myCountry });

      console.log('Document written with ID: ', docRef.id);

      setMyCountry('');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <View>
      <Input placeholder='Update email address' style={{ marginTop: 20 }} />
      <TouchableOpacity
        style={{ marginTop: -20, marginBottom: 20, marginLeft: 100, width: '50%', backgroundColor: 'blue' }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleCountryChange} // Use the handleCountryChange function to set the value
        setItems={setItems}
      />
      <Button title='Submit' onPress={addMyCountry} />
    </View>
  );
}

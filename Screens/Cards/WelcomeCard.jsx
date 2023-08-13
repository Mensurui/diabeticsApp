import React, { useEffect, useState } from 'react';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { View, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function WelcomeCard({ userName, country }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const quoteOfTheDay = data[randomIndex].text;
        setQuote(quoteOfTheDay);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
      });
  };

  return (
    <View style={{paddingTop:20, backgroundColor:'#C4DFDF'}}>
        <Card.Title style={styles.title}>Welcome {userName || 'User'} from {country}</Card.Title>
        <Card.Divider />
        <View style={styles.container}>
          <Text style={styles.text}>Here is your quote of the day:</Text>
          <Text style={styles.quoteText}>{quote}</Text>
          <TouchableOpacity onPress={fetchQuote}>
            <Text>Click</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  text: {
    fontSize: 18,
    color: '#FAF0D7',
    textAlign: 'center',
  },
  quoteText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

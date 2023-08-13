import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native'

export default function AccountSettings({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
 const [items, setItems] = useState([
  {label: 'Amharic', value: 'amharic'},
  {label: 'English', value: 'english'},
  {label: 'French', value: 'french'},
  {label: 'Arabic', value: 'arabic'},
 ]);
  return (
    <View style={styles.choice}>
       <TouchableOpacity style={styles.choice1} onPress={() => navigation.navigate('Account Settings')} >
        <Text style={styles.text}>Account Setting</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.choice2} >
        <Text style={styles.text}>Change Language</Text>
        </TouchableOpacity>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{backgroundColor: '#D2E9E9'}}
      />
      <TouchableOpacity style={styles.choice3} onPress={() => navigation.navigate('Privacy')} >
        <Text style={styles.text}>Privacy Policy</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.choice4} onPress={()=>navigation.navigate('Help')}>
        <Text style={styles.text}>Help center</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  choice:{
    backgroundColor:'#83AAAA',
    width:'100%',
    height:'100%',
  },
  choice1:{
    backgroundColor:'#C4DFDF',
    height:100,
  },
  choice2:{
    backgroundColor:'#D2E9E9',
    height:100,
    marginBottom:-40
  },
  choice3:{
    backgroundColor:'#E3F4F4',
    height:100,
  },
  choice4:{
    backgroundColor:'#C3F2F2',
    height:100,
  },
  text:{
    fontSize:20,
  }
})
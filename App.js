import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {

const [contacts, setContacts] = useState([]);

const showContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
      { fields: [ Contacts.Fields.PhoneNumbers ]}
    );
    if (data.length > 0) {
      setContacts(data);
    }
  }
}

const listSeparator = () => {
  return(
    <View
      style={{
        height: 5,
        width: '80%',
        backgroundColor: '#fff',
        marginLeft: '10%'
      }}
    />
  );
};

  return (
    <View style={styles.container}>

      <FlatList
        style={ styles.list }
        keyExtractor={ item => item.id }
        renderItem={ ({ item }) => 
      <View style={ styles.listcontainer }>
        <Text>
          { item.firstName }
          <Text> </Text>
          { item.lastName }
          <Text> </Text>
          { item.phoneNumbers[0].number }
        </Text>
        </View>}
     data={ contacts }
     ItemSeparatorComponent={ listSeparator }
     />
     
      <View style={ styles.button }>
        <Button color='#00cccc' width='60%'
          title='GET CONTACTS'
          onPress={ showContacts }
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20
  },
button : {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00cccc',
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '60%',
    height: 40
  },
text : {
    color: 'black',
    fontSize: 25,
    marginBottom: 4,
  },
list : {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20
  },
listcontainer : {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
},
});

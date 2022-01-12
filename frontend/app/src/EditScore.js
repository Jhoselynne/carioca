import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import { FlatList, TextInput } from 'react-native-web';

function EditScore({ navigation }) {

  const [game, setGame] = useState([]);
  const [roundPoints, setRoundPoints] = useState();

  useEffect(() => {
    fetch('https://illanes.com/carioca/api/public/round', {
      method: 'GET',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16'
      })
    })
    .then((response) => response.json())
    .then((json) => { setGame(json)
      console.log(json);
    })
    .catch((e) => console.log(e));
  }, [])

  return (
    <View style={styles.container}>
            <Text> Edit Scores </Text>
        <View style={styles.spacebetween}>
            <FlatList
                data={game}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text>{item.name}</Text>
                    <View style={{flexDirection: 'row', marginLeft: 5}}>
                        <TextInput style= {styles.boxBorder} 
                          placeholder="0" 
                          value={roundPoints} 
                          onChangeText={(value) => setRoundPoints(value)}
                        />
                        <Text> p</Text>
                    </View>
                </View>
                )}
            />
        </View>
        <Button
            title="Save"
            onPress={() => navigation.navigate('Round')}
        />
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    spacebetween: {
      paddingVertical: 20,
    },
    headerSize: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    boxBorder: {
      borderWidth: 1,
      borderRadius: 2,
      width: 25
    },
  });

export default EditScore;
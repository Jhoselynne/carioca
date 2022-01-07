import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import { FlatList } from 'react-native-web';

function EditScore({ navigation }) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.spacebetween}>
//           <Text> This is the Score screen </Text>
//         </View>
//         <Button
//           title="Go to Round screen"
//           onPress={() => navigation.navigate('Round')}
//         />
//       </View>
//     )
//   }

  const [game, setGame] = useState([]);

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
            <h1> Edit Scores </h1>
        <View style={styles.spacebetween}>
            <FlatList
                data={game}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text>{item.name}</Text>
                    <View style={{marginLeft: 5}}>
                        <input style={{width: 25}}
                        placeholder="p."/>
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
    }
  });

export default EditScore;
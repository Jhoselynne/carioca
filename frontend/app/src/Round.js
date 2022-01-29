import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, FlatList} from "react-native";
import { ContextStatus } from "../App";

function Round({ navigation }) {
  const {status} = useContext(ContextStatus);

  const [playerInfo, setPlayerInfo] = useState([]);

  useEffect(() => {
    fetch('https://illanes.com/carioca/api/public/score/game/2', {
      method: 'GET',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + status
      })
    })
    .then((response) => response.json())
    .then((json) => {
      for (let index = 0; index < json.users.length; index++) {
        const user = json.users[index];
        let sum = 0;
        for (let index2 = 0; index2 < user.points.length; index2++) {
          sum += user.points[index2].points;
        }
        user.sum = sum;
      }
      setPlayerInfo(json.users);
    })
    .catch((e) => console.log(e));
  }, [])

  return (
    <View style={styles.container}>
      <Text> On going round:</Text>
      <Text> "2 trios" </Text>
      <View style={{paddingTop: 20}}>
        <Text> SCOREBOARD </Text>
        <Text>*****************</Text>
        <View>
          <FlatList
            data={playerInfo}
            keyExtractor={item => item.userName}
            renderItem={({item, index}) => (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <Text>{item.userName + " " + item.sum}</Text>
              <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Text> p</Text>
              </View>
            </View>
            )}
          />
        </View>
      </View>
      <View style={styles.spacebetween}>
        <Button
          title="Enter Score"
          onPress={() => navigation.navigate('Edit Score')}
        />
      </View>
    </View>
  )
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
  }
});

export default Round;

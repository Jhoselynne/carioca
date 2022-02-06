import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, FlatList} from "react-native";
import { ContextGameId, ContextToken } from "../App";

function Round({ navigation }) {
  const {token} = useContext(ContextToken);
  const {gameId} = useContext(ContextGameId);

  const [playerInfo, setPlayerInfo] = useState([]);
  const [roundId, setRoundId] = useState();
  const [roundName, setRoundName] = useState("");
  const [rendered, setRendered] = useState(Date.now());

  useEffect(() => {
    fetch('https://illanes.com/carioca/api/public/score/game/'.concat(gameId), {
      method: 'GET',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + token
      })
    })
    .then((response) => response.json())
    .then((json) => {
      setRoundId(json.roundId);
      for (let index = 0; index < json.users.length; index++) {
        const user = json.users[index];
        let sum = 0;
        for (let index2 = 0; index2 < user.points.length; index2++) {
          sum += user.points[index2].points;
        }
        user.sum = sum;
      }
      setPlayerInfo(json.users.sort(function(a, b) {
        return a.sum-b.sum
      }));
    })
    .catch((e) => console.log(e));
  }, [rendered])

  useEffect(() => {
    if (roundId) {
      fetch('https://illanes.com/carioca/api/public/round/'.concat(roundId), {
        method: 'GET',
        headers: new Headers({
          'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
          'Authorization': 'Bearer ' + token
        })
      })
      .then((response) => response.json())
      .then((json) => {
        setRoundName(json.name);
      })
      .catch((e) => console.log(e));
    }
  }, [roundId])

  return (
    <View style={styles.container}>
      <Text>On going round:</Text>
      <Text>{roundName}</Text>
      <Text style={{paddingTop: 20}}>SCOREBOARD</Text>
      <Text>****************</Text>
      <FlatList
        style={styles.disableGrow}
        data={playerInfo}
        keyExtractor={item => item.userName}
        renderItem={({item, index}) => (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <Text>{item.userName}</Text>
          <View style={{flexDirection: 'row', marginLeft: 5}}>
            <Text> {item.sum} p</Text>
          </View>
        </View>
        )}
      />
      <Button
        title="Enter Score"
        onPress={() => navigation.navigate('Edit Score', {setRendered: setRendered})}
      />
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
  disableGrow: {
    flexGrow: 0,
  }
});

export default Round;

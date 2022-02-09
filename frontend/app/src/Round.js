import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, FlatList} from "react-native";
import { ContextGameId, ContextToken } from "../App";

function Round({ navigation }) {
  // Hooks with context
  const {token} = useContext(ContextToken);
  const {gameId} = useContext(ContextGameId);

  // Hooks
  const [playerInfo, setPlayerInfo] = useState([]);
  const [roundId, setRoundId] = useState();
  const [roundName, setRoundName] = useState("");
  const [rendered, setRendered] = useState(Date.now());

  // Gets score
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
      // For each user
      for (let index = 0; index < json.users.length; index++) {
        const user = json.users[index];
        let sum = 0;
        // For each points
        for (let index2 = 0; index2 < user.points.length; index2++) {
          sum += user.points[index2].points;
        }
        // Store sum as a new key value in the user object
        user.sum = sum;
      }
      // Sort players by score in ascending order
      setPlayerInfo(json.users.sort(function(a, b) {
        return a.sum-b.sum
      }));
    })
    .catch((e) => console.log(e));
  }, [rendered])

  // Fetch round name
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
      <Text style={styles.headerSize}>On going round:</Text>
      <Text style={styles.textSize}>{roundName}</Text>
      <View style={styles.marginTop}>
        <Text style={[styles.textSize, styles.scoreStyle]}>SCOREBOARD</Text>
      </View>
      <Text style={[styles.textSize, styles.scoreStyle]}>*******************</Text>
      <FlatList
        style={styles.disableGrow}
        data={playerInfo}
        keyExtractor={item => item.userName}
        renderItem={({item, index}) => (
        <View style={styles.userAndPoints}>
          <Text style={styles.textSize}>{item.userName}</Text>
          <View style={{flexDirection: 'row', marginLeft: 5}}>
            <Text style={styles.textSize}> {item.sum} p</Text>
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
  },
  textSize: {
    fontSize: 18,
  },
  headerSize: {
    fontSize: 20,
  },
  marginTop: {
    marginTop: 80,
  },
  scoreStyle: {
    fontWeight: 'bold',
  },
  userAndPoints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});

export default Round;

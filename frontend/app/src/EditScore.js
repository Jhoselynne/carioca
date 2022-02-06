import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, FlatList, TextInput} from "react-native";
import { ContextGameId, ContextToken } from "../App";

function EditScore({ route, navigation }) {

  const {token} = useContext(ContextToken);
  const {gameId} = useContext(ContextGameId);

  // Hooks
  const [rounds, setRounds] = useState([]);
  const [points, setPoints] = useState(["","","","","","","",""]);

  useEffect(() => {
    fetch('https://illanes.com/carioca/api/public/round', {
      method: 'GET',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + token
      })
    })
    .then((response) => response.json())
    .then((json) => {
      setRounds(json)
    })
    .catch((e) => console.log(e));
  }, [])

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
      const user = json.users.find(item => item.userId === jwtDecode(token).user_id);
      if (user) {
        let onlyPoints = ["","","","","","","",""];
        for (let index = 0; index < user.points.length; index++) {
          onlyPoints[index] = user.points[index].points;
        }
        console.log(onlyPoints);
        setPoints(onlyPoints);
      }
    })
    .catch((e) => console.log(e));
  }, [])

  // Send points to backend
  const putPoints = () => {
    let obj = {}
    for (let index = 0; index < rounds.length; index++) {
      const round = rounds[index];
      const key = round.id.toString();
      const value = Number(points[index]);
      obj[key] = value;
    }
    fetch('https://illanes.com/carioca/api/public/score/game/'.concat(gameId), {
      method: 'PUT',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      route.params.setRendered(Date.now());
      navigation.navigate('Round');
    })
    .catch((e) => {
      alert("Incorrect value!");
    });
  }

  return (
    <View style={styles.container}>
      <Text> User: {jwtDecode(token).user_name} </Text>
      <Text> Scores </Text>
      <View style={styles.spacebetween}>
        <FlatList
          style={styles.disableGrow}
          data={rounds}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <Text>{item.name}</Text>
            <View style={{flexDirection: 'row', marginLeft: 5}}>
              <TextInput
                style= {styles.boxBorder}
                keyboardType={'numeric'}
                placeholder="0"
                value={points[index].toString()}
                onChangeText={(value) => {
                  if (value == "") {
                    const newPoints = points.slice()
                    newPoints[index] = value
                    setPoints(newPoints)
                  }
                  else if (Number(value) != NaN) {
                    const newPoints = points.slice()
                    newPoints[index] = Number(value)
                    setPoints(newPoints)
                  }
                }}
              />
              <Text> p</Text>
            </View>
          </View>
          )}
        />
      </View>
      <Button
        title="Save"
        onPress={putPoints}
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
    disableGrow: {
      flexGrow: 0,
    }
  });

export default EditScore;
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import { FlatList, TextInput } from 'react-native-web';
import { ContextStatus } from "../App";

function EditScore({ navigation }) {

  const {status} = useContext(ContextStatus);

  // Hooks
  const [rounds, setRounds] = useState([]);
  const [points, setPoints] = useState(["","","","","","","",""]);

  useEffect(() => {
    fetch('https://illanes.com/carioca/api/public/round', {
      method: 'GET',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + status
      })
    })
    .then((response) => response.json())
    .then((json) => {
      setRounds(json)
    })
    .catch((e) => console.log(e));
  }, [])

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
      const user = json.users.find(item => item.userId === jwtDecode(status).user_id);
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

  const putPoints = () => {
    let obj = {}
    for (let index = 0; index < rounds.length; index++) {
      const round = rounds[index];
      const key = round.id.toString();
      const value = Number(points[index]);
      obj[key] = value;
    }
    fetch('https://illanes.com/carioca/api/public/score/game/2', {
      method: 'PUT',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + status,
        'content-type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      navigation.navigate('Round');
    })
    .catch((e) => {
      alert("Incorrect value!");
    });
  }

  return (
    <View style={styles.container}>
      <Text> User: {jwtDecode(status).user_name} </Text>
      <Text> Scores </Text>
      <View style={styles.spacebetween}>
        <FlatList
          data={rounds}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <Text>{item.name}</Text>
            <View style={{flexDirection: 'row', marginLeft: 5}}>
              <TextInput style= {styles.boxBorder}
                placeholder="0"
                value={points[index]}
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
  });

export default EditScore;

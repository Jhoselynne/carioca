import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, FlatList} from "react-native";
import { ContextToken } from "../App";

function Round({ navigation }) {
  const {token} = useContext(ContextToken);

  const [playerInfo, setPlayerInfo] = useState([]);
  // const [points, setPoints] = useState([]);



  useEffect(() => {
    fetch('https://illanes.com/carioca/api/public/score/game/2', {
      method: 'GET',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + token
      })
    })
    .then((response) => response.json())
    .then((json) => {
      setPlayerInfo(json.users);
      console.log(json.users);

      let myPoints = [{}];
      for (let index = 0; index < json.users.length; index++) {
        const user = json.users[index];

        for (let index2 = 0; index2 < user.points.length; index2++) {
          // const Points = user.points[index2].points;
          myPoints[index2] = user.points[index2].points;
          console.log(myPoints);
          // myPoints[index2] = Number(Points[index2]);
        }
      }
      console.log(myPoints);
    })
    .catch((e) => console.log(e));
  }, [])

  // Use reduce to get the total sum of points!
  // function getSum(total, num) {
  //   return total + num;
  // }
  // points.reduce(getSum, 0);

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
              <Text>{item.userName + " " + item.points[(index).points]}</Text>
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
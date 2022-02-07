import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, StyleSheet, TextInput, View } from "react-native";
import { ContextGameId, ContextToken } from "../App";

function GameID({ navigation }) {
  const { token } = useContext(ContextToken);
  const { gameId, setGameId } = useContext(ContextGameId);
  const [gameIdValue, setGameIdValue] = useState();

  const getGameId = () => {
    fetch('https://illanes.com/carioca/api/public/game/'.concat(gameIdValue), {
      method: 'Get',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + token
      }),
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json()
    })
    .then((response) => {
      setGameId(response.id);
      console.log(response.id);
    })
    .catch((e) => {
      alert("Game not found, select 1, 2 or 3");
    });
  }

  useEffect(() => {
    if (gameId) {
      navigation.navigate('Round');
    }
  }, [gameId])

  return (
    <View style={styles.container}>
      <Text> Welcome: {jwtDecode(token).user_name} </Text>
      <View style={styles.spacebetween}>
        <Text> Game ID </Text>
        <TextInput
          style={styles.boxBorder}
          placeholder = "Set a number"
          onChangeText = {setGameIdValue}>
        </TextInput>
      </View>
      <Button
        title = "Enter"
        onPress = {getGameId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  spacebetween: {
    paddingVertical: 20,
  },
  boxBorder: {
    borderWidth: 1,
    borderRadius: 2,
  },
});

export default GameID;

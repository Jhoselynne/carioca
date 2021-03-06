import React, { useContext, useState } from "react";
import { Button, Text, StyleSheet, TextInput, View } from "react-native";
import { ContextGameId, ContextToken } from "../App";

function GameID({ navigation }) {
  const { token } = useContext(ContextToken);
  const { setGameId } = useContext(ContextGameId);

  const [gameIdValue, setGameIdValue] = useState();

  /* Function that checks if game exist.
  If respons status = OK => set GameId then navigat to Round-page */
  const getGameId = () => {
    fetch('https://illanes.com/carioca/api/public/game/'.concat(gameIdValue), {
      method: 'Get',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'Authorization': 'Bearer ' + token
      }),
    })
    .then((response) => {
      // status 200 = OK
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json()
    })
    .then((response) => {
      setGameId(response.id);
      navigation.navigate('Round');
    })
    .catch((e) => {
      alert("Game not found, select 1, 2 or 3");
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacebetween}>
        <Text style={styles.textSize}> Game ID </Text>
        <TextInput
          style={styles.inpuBox}
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
  inpuBox: {
    borderWidth: 1,
    borderRadius: 2,
    width: 100,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textSize: {
    fontSize: 18,
  }
});

export default GameID;

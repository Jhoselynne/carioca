import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Button, Text, StyleSheet, TextInput, View } from "react-native";
import { ContextGameId, ContextToken } from "../App";

function GameID({ navigation }) {
  const { token } = useContext(ContextToken);
  const { setGameId } = useContext(ContextGameId);

  return (
    <View style={styles.container}>
      <Text> Welcome: {jwtDecode(token).user_name} </Text>
      <View style={styles.spacebetween}>
        <Text> Game ID </Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Set a number"
          onChangeText={setGameId}>
        </TextInput>
      </View>
      <Button
        title="Enter"
        onPress={() => navigation.navigate("Round")}
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

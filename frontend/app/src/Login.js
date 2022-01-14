import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { ContextToken } from "../App";

function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {token, setToken} = useContext(ContextToken);

  useEffect(() => {
    if (token) {
      // TODO: Save token in context
      navigation.navigate('GameID');
    }
  }, [token])

  return (
    <View style={styles.container}>
      <View style={styles.spacebetween}>
        <Text> User Name </Text>
        <TextInput style={styles.boxBorder} onChangeText={setUserName}></TextInput>
      </View>
      <View style={styles.spacebetween}>
        <Text> Password </Text>
        <TextInput style= {styles.boxBorder} onChangeText={setPassword}></TextInput>
      </View>
      <Button
        title="Enter" onPress={() => {
          fetch('https://illanes.com/carioca/api/public/login', {
            method: 'POST',
            headers: new Headers({
              'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
              'content-type': 'application/json'
            }),
            body: JSON.stringify({'username': userName, 'userpassword': password})
          })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.status);
            }
            return response.json()
          })
          .then((response) => {
            setToken(response);
          })
          .catch((e) => {
            alert("Incorrect username or password!");
          });
        }}
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
  }
});

export default Login;

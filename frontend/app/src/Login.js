import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Platform } from "react-native";
import { ContextToken } from "../App";
// import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const {token, setToken} = useContext(ContextToken);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // Function that gets and sets token through 'POST' method to the API
  const getToken = () => {
    fetch('https://illanes.com/carioca/api/public/login', {
      method: 'POST',
      headers: new Headers({
        'X-Api-Key': '0c9bac13f5734c6ea1264643d6f60a16',
        'content-type': 'application/json'
      }),
      body: JSON.stringify({'username': userName, 'userpassword': password})
    })
    .then((response) => {
      // status 200 = OK
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json()
    })
    .then((json) => {
      setToken(json.id_token);
    })
    .catch((e) => {
      alert("Incorrect username or password!");
    });
  }

  // First render token = undifined = false
  useEffect(() => {
    if (token) {
      navigation.navigate('GameID');
    }
  }, [token])

  return (
    <View style={styles.container}>
      <View style={styles.spacebetween}>
        <Text style={styles.textSize}> User Name </Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={setUserName}>
        </TextInput>
      </View>
      <View style={styles.spacebetween}>
        <Text style={styles.textSize}> Password </Text>
        <TextInput
          style= {styles.inputBox}
          secureTextEntry={true}
          onChangeText={setPassword}>
        </TextInput>
      </View>
      <Button
        title="Enter"
        onPress={getToken}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    ...Platform.select({
      ios: {
        backgroundColor: '#e2e2e2'
      },
      android: {
        backgroundColor: '#ffeff3'
      },
      default: {
        backgroundColor: '#fff'
      },
    }),
  },
  spacebetween: {
    paddingVertical: 20,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textSize: {
    fontSize: 18,
  }
});

export default Login;

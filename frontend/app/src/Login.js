import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Platform } from "react-native";
import { ContextToken } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  let counter = 0;
  const debugEnabled = true;
  const {token, setToken} = useContext(ContextToken);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const debug = (message) => {
    if(debugEnabled) {
      counter++;
      console.log(counter + ": " + message);
    }
  }

  // Function that gets and sets token through 'POST' method to the API
  const getToken = () => {
    debug("********** LOGIN - GET_TOKEN **********: " . token);
    if(!token){
      debug("********** LOGIN - GET_TOKEN **********: Fetching new token from server");
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
        debug("********** LOGIN - GET_TOKEN: Setting The token in context variable **********");
        setToken(json.id_token);
      })
      .catch((e) => {
        alert("Incorrect username or password!");
      });
    } else {
      debug("********** LOGIN - GET_TOKEN **********: Token in context have already a value and therefore skipping fetch token from server");
      navigation.navigate('GameID');
    }
  }

  // Save Object
  const storeData = async (value) => {
    debug("********** LOGIN - STORE_DATA **********");
    try {
      let jsonValue = undefined;
      if(value){
        jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@loggedIn_Key", jsonValue);
      }
      debug("----- LOGIN - STORE_DATA ----- " + jsonValue);
    } catch (error) {
      debug("----- LOGIN - STORE_DATA - ERROR ----- " + error);
    }
  };

  // Load Object
  const getData = async () => {
    debug("********** LOGIN - GET_DATA **********");
    try {
      let jsonValue = await AsyncStorage.getItem('@loggedIn_Key');
      if(jsonValue == "undefined"){
        jsonValue = null;
      }
      debug("----- LOGIN - GET_DATA ----- " + jsonValue);
      if(jsonValue == null || jsonValue == undefined){
        debug("########## LOGIN - GET DATA: jsonValue is null or undefined ##########");
        return null;
      } else {
        debug("########## LOGIN - GET DATA: jsonValue have content ##########: ");
        setToken(JSON.parse(jsonValue));
        return jsonValue;
      }
      // return jsonValue != null ? setToken(JSON.parse(jsonValue)) : null;
    } catch(e) {
      debug("----- LOGIN - GET_DATA - ERROR ----- " + e);
    }
  };

  // First render token = undefined = false
  useEffect(() => {
    debug("********** LOGIN - USE_EFFECT **********");
    getData();
    storeData(token);
    debug("----- LOGIN - USE_EFFECT ----- " + token);
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
        title="Login"
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

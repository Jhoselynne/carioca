import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.spacebetween}>
        <Text> Game ID </Text>
        <TextInput style= {styles.boxBorder}></TextInput>
      </View>
      <View style={styles.spacebetween}>
        <Text> User Name </Text>
        <TextInput style= {styles.boxBorder}></TextInput>
      </View>
      <View style={styles.spacebetween}>
        <Text> Password </Text>
        <TextInput style= {styles.boxBorder}></TextInput>
      </View>
      <Button title="Enter" onPress={() => navigation.navigate("Round")} />
    </View>
  );
}

// function Round({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.spacebetween}>
//         <Text> This is the Round game screen </Text>
//       </View>
//       <Button
//         title="Go to Score screen"
//         onPress={() => navigation.navigate('Edit Score')}
//       />
//     </View>
//   )
// }

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

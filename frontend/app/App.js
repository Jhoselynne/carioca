import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-web";

import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          getComponent={() => require("./src/Login").default}
          options={{
            title: "Carioca",
            headerStyle: {
              backgroundColor: "pink",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Alert test"
                color="purple"
              />
            ),
          }}
        />

        <Stack.Screen
          name="Round"
          getComponent={() => require("./src/Round").default}
        />
        <Stack.Screen
          name="Edit Score"
          getComponent={() => require("./src/EditScore").default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   const [game, setGame] = useState([]);

//   useEffect(() => {
//   fetch('https://illanes.com/carioca/test_scoreboard.php')
//     .then((response) => response.json())
//     .then((json) => { setGame(json)
//       console.log(json);
//     })
//     .catch((e) => console.log(e));
//   }, [])

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={game.scoreBoard}
//         keyExtractor={item => item.userName}
//         renderItem={({item, index}) => (
//           <Text>{(index + 1) + ': ' + item.userName + ' ' + item.points}</Text>
//         )}
//       />

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

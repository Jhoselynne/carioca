import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import jwtDecode from "jwt-decode";

export const ContextToken = createContext();
export const ContextGameId = createContext();


const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState();
  const [gameId, setGameId] = useState();

  return (
    <ContextToken.Provider value={{token, setToken}}>
      <ContextGameId.Provider value={{gameId, setGameId}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"

            screenOptions={{
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "pink",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}>
            <Stack.Screen
              name="Login"
              getComponent={() => require("./src/Login").default}
              options={{
                title: "Carioca",
                // headerStyle: {
                //   backgroundColor: "pink",
                // },
                // headerTintColor: "#fff",
                // headerTitleStyle: {
                //   fontWeight: "bold",
                // },
              }}
            />
            <Stack.Screen
              name="GameID"
              getComponent={() => require("./src/GameID").default}
              options={{
                headerRight: () => (
                  <Text style={{marginHorizontal: '1%'}}>Welcome: {jwtDecode(token).user_name}</Text>),
              }}
            />
            <Stack.Screen
              name="Round"
              getComponent={() => require("./src/Round").default}
              options={{
                headerRight: () => (
                  <Text style={{marginHorizontal: 20}}>User: {jwtDecode(token).user_name}</Text>),
              }}
            />
            <Stack.Screen
              name="Edit Score"
              getComponent={() => require("./src/EditScore").default}
              options={{
                headerRight: () => (
                  <Text style={{marginHorizontal: 20}}>User: {jwtDecode(token).user_name}</Text>),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextGameId.Provider>
    </ContextToken.Provider>
  );
}

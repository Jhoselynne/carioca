import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-web";

export const ContextStatus = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [status, setStatus] = useState();

  return (
    <ContextStatus.Provider value={{status, setStatus}}>
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
            name="GameID"
            getComponent={() => require("./src/GameID").default}
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
    </ContextStatus.Provider>
  );
}

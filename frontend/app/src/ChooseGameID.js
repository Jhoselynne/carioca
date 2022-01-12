import React, { useContext } from "react";
import { Button, Text, StyleSheet, TextInput } from "react-native";
import { View } from "react-native-web";
import { TokenContext } from "./TokenContext";

const [token, setToken] = useContext(TokenContext);

function ChooseGameID ({ navigation }) {
    return(
        <View style={styles.container}>
            <Text> Game ID </Text>
            <Text> {token} </Text>
            <View style={styles.spacebetween}>
                <TextInput style= {styles.boxBorder}></TextInput>
            </View>
            <Button 
                title="Enter"
                onPress={() => navigation.navigate('Round')}
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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

export default ChooseGameID;
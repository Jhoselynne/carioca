import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Button, Text, StyleSheet, TextInput } from "react-native";
import { View } from "react-native-web";
import { ContextToken } from "../App";

function ChooseGameID ({ navigation }) {
    const {token} = useContext(ContextToken);

    return(
        <View style={styles.container}>
            <Text> Game ID </Text>
            <Text> {jwtDecode(token).user_name} </Text>
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
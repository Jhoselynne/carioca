import React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";

function Round({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.spacebetween}>
        <Text> This is the Round game screen </Text>
      </View>
      <Button
        title="Enter Score"
        onPress={() => navigation.navigate('Edit Score')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacebetween: {
    paddingVertical: 20,
  }
});

export default Round;
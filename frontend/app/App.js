import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const [cocktail, setCocktail] = useState([]);

  useEffect(() => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  // fetch('https://illanes.com/carioca/test_scoreboard.php')
    .then((response) => response.json())
    .then((json) => { setCocktail(json)
      console.log(json);
    })
    .catch((e) => console.log(e));
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktail.drinks}
        keyExtractor={item => item.idDrink}
        renderItem={({item, index}) => (
          <Text>{index + ': ' + item.idDrink + ' ' + item.strDrink}</Text>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

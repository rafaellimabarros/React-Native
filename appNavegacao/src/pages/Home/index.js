import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { useNavigation} from '@react-navigation/native';

export default function Home(){
    const navigation = useNavigation();

    function navegaSobre(){
        navigation.navigate('Sobre', {nome: 'Rafael Lima', email: 'rafael.redes38@gmail.com'});
    }

  return(
    <View style={styles.container}>
      <Text> Home </Text>
      <Button title="Sobre" onPress={ navegaSobre }/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}); 

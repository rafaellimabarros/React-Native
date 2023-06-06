import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { useNavigation, StackActions } from '@react-navigation/native';

export default function Contato(){
    const navigation = useNavigation();

    function voltarHome(){
        navigation.dispatch(StackActions.popToTop());
    }

  return(
    <View style={styles.container}>

        <View style={styles.sobre}>
            <Text> Contatos </Text>
            <Button title='Voltar Home' onPress={voltarHome} />
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  sobre:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}); 

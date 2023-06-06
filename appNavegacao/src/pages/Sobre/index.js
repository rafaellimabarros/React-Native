import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function Sobre(){
    const navigation = useNavigation();
    const route = useRoute();

    useLayoutEffect(()=> {
        navigation.setOptions({
            title: route.params?.nome === '' ? 'Sobre' : route.params?.nome
        })
    }, [navigation])

  return(
    <View style={styles.container}>

        <View style={styles.sobre}>
            <Text> Sobre </Text>
            <Text> Nome: {route.params?.nome} </Text> 
            <Text> E-mail: {route.params?.email} </Text>
            <Button title='Contatos' onPress={() => navigation.navigate('Contato')} />
            <Button title='Voltar' onPress={()=> navigation.goBack() } />
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
  },
  botao:{
    marginTop: '8%',
    marginLeft: '2%'
  }
}); 

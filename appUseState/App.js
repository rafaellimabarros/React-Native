import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput  } from 'react-native';

export default function App(){

  const [nome, setNome] = useState('Rafa');
  const [input, setInput] = useState('');

  function alteraNome(){
    setNome(input);
    setInput('');
  }
  function alteraInput(texto){
    setInput(texto)
  }

  return(
    <View style={styles.container}>
      <Text > {nome} Dev React Native </Text>

      <TouchableOpacity style={styles.btnArea} onPress={alteraNome}> 
        <Text style={styles.btn}>
          Botão Mágico
        </Text>
        </TouchableOpacity>

        <TextInput
        placeholder='texto'
        style={styles.areaInput}
        value={input}
        onChangeText={alteraInput}/>

        <Text> {input} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 50
  },
  btnArea:{
    backgroundColor: 'darkorange',
    width: 200,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10
    
  },
  areaInput:{
    borderBottomWidth: 1,
    marginTop: 10,
    padding: 10,
    width: 200,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
}); 

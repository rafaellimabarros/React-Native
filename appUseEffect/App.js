import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard  } from 'react-native';

export default function App(){

  const [nome, setNome] = useState('Rafael Lima');
  const [input, setInput] = useState('');

    useEffect(()=> {
      async function getStorage(){
        const nomeStorage = await AsyncStorage.getItem('nomes');
        if(nomeStorage !== null){
          setNome(nomeStorage);
        }
        
      }
      getStorage();
    }, []);

  // O UseEffetc precisa de dois parametros, a primeira é a função e depois um array para monitorar o estado, quando mudar o estadoo useeffect executa
  useEffect(()=>{
    async function saveStorage(){
      await AsyncStorage.setItem('nomes', nome)
    }
    saveStorage();
  }, [nome]);

  function alteraNome(){
    setNome(input);
    setInput('');
    Keyboard.dismiss();
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

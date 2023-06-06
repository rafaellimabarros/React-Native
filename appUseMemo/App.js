import React, { useState, useEffect, useMemo, UseRef, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard  } from 'react-native';

export default function App(){

  const [nome, setNome] = useState('Rafael Lima');
  const [input, setInput] = useState('');

  const nomeInput = useRef(null);

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

  function novoNome(){
    nomeInput.current.focus();

  }

  // A use memo só vai executar quando o state do item entre colchetes mudar
  const letrasNome = useMemo(()=> nome.length, [nome]);

  return(
    <View style={styles.container}>
      <Text style={styles.texto}> {nome} Dev React Native </Text>
      <Text  style={styles.texto}> Possui {letrasNome} Caracteres</Text>

        <TextInput
        placeholder='texto'
        style={styles.areaInput}
        value={input}
        onChangeText={alteraInput}
        ref={nomeInput}
        />

        <TouchableOpacity style={styles.btnArea} onPress={novoNome}> 
          <Text style={styles.btn}>
            Novo Nome
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnArea} onPress={alteraNome}> 
          <Text style={styles.btn}>
            Confirmar
          </Text>
        </TouchableOpacity>
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
    backgroundColor: 'darkblue',
    width: 200,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10
    
  },
  areaInput:{
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: 300,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn:{
    color: 'white',
    fontSize: 20
  },
  texto:{
    fontSize: 25,
    padding: 5
  }
}); 

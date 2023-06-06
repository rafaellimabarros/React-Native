import React, { useState, useEffect, useMemo, UseRef, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, SafeAreaView } from 'react-native';
import api from './src/services/api'

//https://viacep.com.br/ws/60035161/json

export default function App(){
  const [cep,setCEP] = useState('');
  const inputRef = useRef(null);
  const [userCEP,setUserCEP] = useState(null);

  async function buscar(){
    if(cep == ''){
      alert('Digite um CEP Válido');
      setCEP('');
      return; // Esse return serve para para o if e sair da função
    } 

    try {
      const response = await api.get(`/${cep}/json`);
      Keyboard.dismiss();
      setUserCEP(response.data);

    } catch (error) {
      console.log('Error: ' + error);
    }

  }

  function limpar(){
    setCEP('');
    inputRef.current.focus();
    setUserCEP(null); 
  }

  return(
    <View style={styles.container}>

        <Text style={styles.texto}> Digite o CEP desejado: </Text>
        
        <TextInput 
        style={styles.inputArea}
        placeholder="Ex: 61700000"
        keyboardType='numeric'
        value={cep}
        onChangeText={(texto) => setCEP(texto)}
        ref ={ inputRef }
        />

      <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.areaBotao, {backgroundColor: 'darkblue', marginRight: '35%'}]}
        onPress={ buscar }
        >
          <Text style={styles.textoBotao}> Buscar </Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.areaBotao, {backgroundColor: 'darkorange'}]}
        onPress={ limpar }
        >
          <Text style={styles.textoBotao}> Limpar </Text>
        </TouchableOpacity>
    </View>

    { userCEP && //isso foi para corrigir o objeto userCEP como null, o react só executa essa view quando não é null
        <View style={styles.resultado}>
        <Text style={styles.textoResultado}> CEP: {userCEP.cep} </Text>
        <Text style={styles.textoResultado}> Logradouro: {userCEP.logradouro} </Text>
        <Text style={styles.textoResultado}> Complemento: {userCEP.complemento} </Text>
        <Text style={styles.textoResultado}> Bairro: {userCEP.bairro} </Text>
        <Text style={styles.textoResultado}> Cidade: {userCEP.localidade} </Text>
        <Text style={styles.textoResultado}> Estado: {userCEP.uf} </Text>
        <Text style={styles.textoResultado}> IBGE: {userCEP.ibge} </Text>
        <Text style={styles.textoResultado}> DDD: {userCEP.ddd} </Text>
      </View>
  }

  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '15%'
  },
  texto:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  inputArea:{
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
    padding: 10,
    marginTop: 15,
    fontSize: 18
  },
  areaBtn:{
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  areaBotao:{
    borderRadius: 10,
    padding: 10,
    textAlign: 'center'
  },
  textoBotao:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textoResultado:{
    fontSize: 16
  }
}); 

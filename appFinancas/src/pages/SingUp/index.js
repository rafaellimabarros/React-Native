import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import { AuthContext } from '../../contexts/auth';

//import React, { useState, useContext } from 'react';
//import { AuthContext } from '../../contexts/auth';
//const { loadingEntrar } = useContext(AuthContext);

export default function SingUp() {
  const [email,setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const { singUp, loadingEntrar } = useContext(AuthContext);

  function handleSingUp(){
    //alert(user.nome);
    singUp(email, senha, nome);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={ styles.container }>
      
        <View style={styles.areaInput}>
          <TextInput 
          style={styles.textoInput}
          placeholder='Nome'
          placeholderTextColor="white"
          autoCorrect={false}
          autoCapitalize='none'
          value={nome}
          onChangeText={ (texto)=> setNome(texto)}
          />
        </View>
  
        <View style={styles.areaInput}>
          <TextInput 
          style={styles.textoInput}
          placeholder='E-mail'
          placeholderTextColor="white"
          autoCorrect={false}
          autoCapitalize='none'
          value={email}
          onChangeText={ (texto)=> setEmail(texto)}
          />
        </View>

        <View style={styles.areaInput}>
          <TextInput 
          style={styles.textoInput}
          secureTextEntry={true}
          placeholder='Senha'
          placeholderTextColor="white"
          autoCorrect={false}
          autoCapitalize='none'
          value={senha}
          onChangeText={ (texto)=> setSenha(texto)}
          />
        </View>

        <TouchableOpacity style={styles.botaoAcessar} onPress={ handleSingUp }>
          {
            loadingEntrar ? (
              <ActivityIndicator size={20} color='white' />
            ) : (
              <Text style={styles.textoBotaoAcessar}> Cadastrar </Text>
            )
          }

        </TouchableOpacity>

      </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  areaInput:{
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    backgroundColor: 'darkslategrey',
    marginBottom: '5%'
  },
  textoInput:{
    fontSize: 20,
    color: 'white'
  },
  botaoAcessar:{
    backgroundColor: 'green',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10
  },
  textoBotaoAcessar:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textoBotaoCadastro:{
    fontSize: 18,
    color: 'white'
  },
  botaoCadastro:{
    marginTop: '10%'
  }
});

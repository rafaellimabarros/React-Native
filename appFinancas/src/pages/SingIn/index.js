import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'; //importou por chaves por que lá não é export default

export default function SingIn() {
  const navigation = useNavigation();
  const [email,setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { singIn, loadingEntrar } = useContext(AuthContext); // Pega o contexto, e quero só os dados que estão no objeto user

  function handleLogin(){
    //alert(user.nome);
    singIn(email, senha);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={ styles.container }>
           
        <Image source={require('../../assets/Logo.png')} style={{ marginBottom: '10%' }} />

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

        <TouchableOpacity style={styles.botaoAcessar} onPress={ handleLogin }>
          {
            loadingEntrar ? ( //interrogação significa se loadingEntrar for = a true
              <ActivityIndicator size={20} color='white' />
            ) : (
              <Text style={styles.textoBotaoAcessar}> Acessar </Text>
            )
          }
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCadastro} onPress={ ()=> navigation.navigate('SingUp') }>
          <Text style={styles.textoBotaoCadastro}> Criar uma conta </Text>
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

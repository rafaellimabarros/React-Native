import React ,{ Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList} from 'react-native';
import StartFirebase from '../../start_firebase';
import {ref, set, get, update, remove, child, val, onValue, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login( { changeStatus } ){
  const [db, setDB] = useState('');
  const [ tipo, setTipo] = useState('login');
  const [ email, setEmail] = useState('');
  const [ senha, setSenha] = useState('');

  useEffect(()=> {
    setDB(StartFirebase());
  }, []);

  async function manipulaLogin(){
    if( tipo === 'login'){
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, senha)
          .then((value) => {
            // Signed in
            changeStatus(value.user.uid);
            // ...
          })
          .catch((error) => {
                alert('Usuário ou senha inválidos!');
            // ..
          });
    }
    
    else{
        const auth = getAuth();
        await createUserWithEmailAndPassword (auth, email, senha)
          .then((value) => {
            //alert(value.user.uid);
    
            set(ref(db, 'usuarios/'+ value.user.uid),
            {
                email: email
            });
            
            changeStatus(value.user.uid);
          })
          .catch((error) => {
              if(error.code === 'auth/weak-password'){
                alert('Sua senha deve ter pelo menos 6 caracteres');
                return;
              }if(error.code === 'auth/invalid-email'){
                alert('Insira um e-mail válido');
                return;
              }else{
                alert('Ops, algo deu errado');
              }
            // ..
          });
    }

  }

    return(
      <View style={styles.container}>

      <View style={styles.areaInput}>

        <Text> E-mail: </Text>
        <TextInput 
        style={styles.input}
        placeholder='E-mail'
        onChangeText={(texto)=> { setEmail(texto)}}
        value={email}
        />

        <Text> Senha: </Text>
        <TextInput 
        style={styles.input}
        placeholder='Senha'
        onChangeText={(texto)=> { setSenha(texto)}}
        value={senha}
        />
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: tipo === 'login' ? 'deepskyblue' : 'darkorange'}]} onPress= { manipulaLogin }> 
            <Text style={styles.textoBotao}> { tipo === 'login' ? 'Entrar': 'Cadastrar'} </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoCadastro} onPress={ ()=> setTipo(tipo => tipo === 'login' ? 'cadastrar' : 'login') }>
            <Text style={styles.textoCadastro}> { tipo === 'login' ? 'Ou Cadastre-se' : 'Já possuo uma conta' } </Text>
        </TouchableOpacity>

    </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  botao:{
    borderRadius: 30,
    padding: 12,
    margin: '2%',
    width:'70%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBotao:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textoResposta:{
    fontSize: 18
  },
  containerBotoes:{
    flexDirection: 'row'
  },
  input:{
    alignSelf: 'stretch',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  },
  areaInput:{
    width: '90%'
  },
  areaBotoes:{
    flexDirection: 'row',
    marginTop: '2%'
  },
  botaoCadastro:{
    marginTop: '2%'
  },
  textoCadastro:{
    color: 'black',
    fontSize: 18
  }
});
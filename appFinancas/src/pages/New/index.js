import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert} from 'react-native';
import Header from '../../components/Header/index';
import Picker from '../../components/Picker';
import StartFirebase from '../../services/start_firebase';
import {ref, set, get, update, remove, child, val, onValue, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from '../../contexts/auth';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export default function New() {
  const navigation = useNavigation();
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const { user } = useContext(AuthContext);
  const [ db, setDB ] = useState('');

  useEffect(()=> {
    setDB(StartFirebase());
  }, []);

  function handleSubmit(){
    Keyboard.dismiss();

    if(tipo === '' || valor === ''){
      alert('Preencha os dados corretamente');
      return;
    }

    Alert.alert(
      'Confirmando Dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: ()=> handleAdd()
        }
      ]
    )
  }

  async function handleAdd(){
    const chave = push(child(ref(db), 'historico')).key;

    await set(ref(db, 'historico/'+ user.uid + '/' + chave ),
    {
      tipo: tipo,
      valor: parseFloat(valor),
      data: format(new Date(), 'dd/MM/yyyy')
    })

    // Pegando os saldo 
    const dbRef = ref(db);
    get(child(dbRef, 'usuarios/'+ user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        let saldo = parseFloat(snapshot.val().saldo);

        tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

        update(ref(db, 'usuarios/'+ user.uid),
          {
            saldo: saldo
          });


      } else {
        alert("Dados não encontrados");
      }
    }).catch((error) => {
      console.error(error);
    }); 

    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');

  }

    return (

    <View style={styles.container}>
      
      <View>
        <Header />
      </View>

      <View style={styles.areaConteudo}>
        
        <View style={styles.areaInput}>
          <TextInput 
          placeholder='Valor' 
          placeholderTextColor={'black'}
          style={styles.textoInput} 
          returnKeyType='next'
          keyboardType='numeric'
          onSubmitEditing={ ()=> Keyboard.dismiss() }
          value={valor}
          onChangeText={ (texto)=> setValor(texto) }

          />
        </View>

        <Picker onChange={setTipo} tipo={tipo} />

        <TouchableOpacity style={styles.botaoRegistrar} onPress={ handleSubmit }>
          <Text style={ styles.textoBotao }>
              Registrar
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  titulo:{
    color: 'white'
  },
  areaConteudo:{
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%'
  },
  areaInput:{
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    backgroundColor: 'white',
    marginBottom: '3%',
    color: 'black'
  },
  textoInput:{
    fontSize: 16,
    color: 'black'
  },
  botaoRegistrar:{
    backgroundColor: '#049301',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    padding: 12
  },
  textoBotao:{
    color: 'white',
    fontSize: 25
  }
});

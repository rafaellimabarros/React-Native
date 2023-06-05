import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { AuthContext } from '../../contexts/auth';
import 'react-native-gesture-handler';
import Header from '../../components/Header/index';
import HistoricoList from '../../components/HistoricoList';
import StartFirebase from '../../services/start_firebase';
import {ref, set, get, update, remove, child, val, onValue, push, orderByChild, limitToFirst, query } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


export default function Home() {
  const { user, sair } = useContext(AuthContext);
  const [db, setDB] = useState('');
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  useEffect(()=> {
    async function loadList(){
      setDB(StartFirebase());
      const value = await ref(db, 'usuarios/' + user.uid);
        onValue(value, (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      const value02 = ref(db, 'historico/' + user.uid);
      
        onValue(value02, (snapshot) => {
          setHistorico([]);

          snapshot.forEach((childItem)=> {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              data: childItem.val().data
            }

            setHistorico(oldArray => [...oldArray, list].reverse());
          })

      });

    }

    loadList();
  }, [db]);

  return (
    <View style={styles.container}>
      <View>
        <Header />
      </View>

      <View style={styles.areaConteudo}>

        <Text style={styles.textoNome}> {user && user.nome} </Text>
        <Text style={styles.textoSaldo}> R$ {saldo.toFixed(2)} </Text>

        <Text style={styles.textoUltimas}> Ultimas movimentações </Text> 

        <FlatList 
        style={styles.lista}
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={ item => item.key }
        renderItem={ ({ item })=> ( <HistoricoList data={item} /> ) }
         />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  textoNome:{
    color: 'white',
    fontSize: 22,
    fontStyle: 'italic',
    marginTop: '10%',
    marginLeft: '8%'
  },
  textoSaldo:{
    color: 'white',
    fontSize: 30,
    marginTop: '2%',
    marginLeft: '8%'
  },
  areaConteudo:{
    flex:1, 
    width: '100%'
  },
  textoUltimas:{
    color: '#049301',
    fontSize: 16,
    marginLeft: '8%',
    marginTop: '10%',
    marginBottom: '3%',
    fontWeight: 'bold'
  },
  lista:{
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: '3%'
  }
});

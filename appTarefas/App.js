import React ,{ useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard} from 'react-native';
import StartFirebase from './src/start_firebase';
import {ref, set, get, update, remove, child, val, onValue, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Login from './src/Components/Login';
import ListaTarefas from './src/Components/ListaTarefas';
import { Feather } from '@expo/vector-icons'; 

export default function App(){
  const [db, setDB] = useState('');
  const [ user, setUser ] = useState(null);
  
  const inputRef = useRef(null);
  const [ tasks, setTasks ] = useState([  ]);
  const [ novaTarefa, setNovaTarefa] = useState('');
  const [ chaveTarefa, setChaveTarefa] = useState('');

  useEffect(()=> {
    setDB(StartFirebase());

    function getUser(){
      if(!user){
        return;
      }else{
        const dbRef = ref(db);
        get(child(dbRef, 'tarefas/'+ user)).then((snapshot) => {
          if (snapshot.exists()) {
            setTasks([]);
            snapshot.forEach((childItem)=> {
              let data = {
                key: childItem.key,
                nome: childItem.val().nome
              }
              setTasks(oldTasks => [...oldTasks, data]);
            })

          } else {
            alert("Dados não encontrados");
          }
        }).catch((error) => {
          console.error(error);
        }); 
      }
    }

    getUser();
  }, [user]);


  function addTarefa(){
    if(novaTarefa === ''){
      alert('Preencha algo na tarefa');
      return;
    }
    
    if(chaveTarefa !== ''){
      update(ref(db, 'tarefas/'+ user + '/' + chaveTarefa ),
      {
        nome: novaTarefa
      }).then(()=> {
        const taskIndex = tasks.findIndex( item=> item.key === chaveTarefa);

        let taskClone = tasks;
        taskClone[taskIndex].nome = novaTarefa;

        setTasks([...taskClone])

      })

      setNovaTarefa('');
      setChaveTarefa('');
      Keyboard.dismiss();
      return;
    }
        
      const chave = push(child(ref(db), 'tarefas')).key;

        set(ref(db, 'tarefas/' + user + '/' + chave), {
        nome: novaTarefa
      }).then(() => {
        const data = {
          key: chave,
          nome: novaTarefa
        };

        setTasks(oldTasks => [...oldTasks, data]);
      })
      setNovaTarefa('');
      Keyboard.dismiss();

    }

  function deletaTarefa(key){
    remove(ref(db, 'tarefas/'+ user + '/' + key)).then(()=> {
      const findTasks = tasks.filter( item => item.key !== key );
      setTasks(findTasks);
    })
  }

  function editaTarefa(data){
    setChaveTarefa(data.key);
    setNovaTarefa(data.nome);
    inputRef.current.focus();

  }

  function cancelaEdicao(){
    setChaveTarefa('');
    setNovaTarefa('');
    Keyboard.dismiss();
  }

  if(!user){
    return(
      <Login changeStatus={ (user)=> setUser(user) } />
    )
  }

  return(
    <View style={styles.container}>

    { chaveTarefa.length > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <TouchableOpacity onPress={ cancelaEdicao }>
              <Feather name="x-circle" size={24} color="red" />
            </TouchableOpacity>
    
            <Text style={{ color: 'red', fontSize: 16 }}> Você está editando uma tarefa </Text>
          </View>
    )}

     <View style={styles.areaInput}>
      <TextInput 
      placeholder='Nova Tarefa'
      style={styles.input}
      onChangeText={(texto)=> { setNovaTarefa(texto)}}
      value={novaTarefa}
      ref={inputRef}
      />

      <TouchableOpacity style={styles.botaoAdd} onPress={ addTarefa }>
        <Text style={styles.mais}> + </Text>
      </TouchableOpacity>

     </View>

     <FlatList
     data={tasks}
     keyExtractor={ (item)=> item.key}
     renderItem={({ item }) => (
        <ListaTarefas data={item} deletaItem={deletaTarefa} editaItem={editaTarefa} />
     )}
    />

    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop: '10%'
  },
  areaInput:{
    flexDirection: 'row',
    marginBottom: '5%',
    justifyContent: 'center'
  },
  input:{
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    height: 45,
    paddingLeft: 10
  },
  botaoAdd:{
    backgroundColor: 'deepskyblue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    marginLeft: '2%'
  },
  mais:{
    color: 'white',
    textAlign: 'center',
    fontSize: 26
  }
});
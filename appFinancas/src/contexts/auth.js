import React, { createContext, useState, useEffect } from 'react';
import StartFirebase from '../services/start_firebase';
import {ref, set, get, update, remove, child, val, onValue, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({}); //cria o contexto e exporta para ser usado em outras páginas

function AuthProvider({ children }){
    const [user,setUser] = useState(null);
    const [db, setDB] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingEntrar, setLoadingEntrar] = useState(false);

    useEffect(()=> {
        setDB(StartFirebase());

        async function loadStorage(){
          const storageUser = await AsyncStorage.getItem('Auth_user'); // verifica se tem algo dentro do storageUser

          if(storageUser){ // se tiver algo dentro então faça
            setUser(JSON.parse(storageUser)); //parse é para converter para json novamente
            setLoading(false); // se tem usuário logado então é falso
          }
          setLoading(false); // se não tem usuário logado também é falso
        }

        loadStorage();
      }, []);

    // Cadastra usuário
    async function singUp(email, senha, nome){
        
        const auth = getAuth();
        setLoadingEntrar(true);

        await createUserWithEmailAndPassword (auth, email, senha)
          .then(async (value) => {
            let uid = value.user.uid;

            await set(ref(db, 'usuarios/'+ uid),
            {
                nome: nome,
                saldo: 0
            })
            .then(()=> {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }
                setLoadingEntrar(false);
                setUser(data);
                storageUser(data);
               
            })
          })
          .catch((error) => {
              if(error.code === 'auth/weak-password'){
                alert('Sua senha deve ter pelo menos 6 caracteres');
                setLoadingEntrar(false);
                return;
              }if(error.code === 'auth/invalid-email'){
                alert('Insira um e-mail válido');
                setLoadingEntrar(false);
                return;
              }else{
                alert('Ops, algo deu errado');
                setLoadingEntrar(false);
              }
            // ..
          });
    }

    //Logar Usuário
    async function singIn(email, senha){
      setLoadingEntrar(true);

      const auth = getAuth();

      await signInWithEmailAndPassword(auth, email, senha)
        .then((value) => {
          const dbRef = ref(db);
          let uid = value.user.uid;

          get(child(dbRef, 'usuarios/'+ uid)).then((snapshot) => {
            let data = {
              uid: uid,
              nome: snapshot.val().nome,
              email: value.user.email,
              saldo: snapshot.val().saldo
            }

            setUser(data);
            storageUser(data);
            setLoadingEntrar(false);

          }).catch((error) => {
            alert('Erro');
          }); 
        })
        .catch((error) => {
              alert('Usuário ou senha inválidos!');
              setLoadingEntrar(false);
        });
    }

    //Função guardar dados do usuario
    async function storageUser(data){
      await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    //Função desloga usuário
    async function sair(){
      const auth = getAuth();

      await signOut(auth);
      
      await AsyncStorage.clear().then( ()=> {
            setUser(null);
          })
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, singUp, singIn, loading, sair, loadingEntrar }}> 
            {children}
        </AuthContext.Provider>

    );
}
//Linha 11: Todos que estão dentro do provider tem acesso aos dados do usuário 
//Linha 12: Basicamente passa todos os dados do user para a children
// signed: !!user -> isso converte a variavel user para booleano, se estiver null no usuer vai cair como falso e vai mandar para as rotas de login, se user tiver alguma coisa vai dar como true e deixar passar pra próxima tela


export default AuthProvider;

//importar lá no App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import StartFirebase from './src/services/start_firebase';
import {ref, set, get, update, remove, child, val, onValue, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Routes from './src/routes/index';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
      <NavigationContainer style={styles.container}>

        <AuthProvider>
          <Routes />
        </AuthProvider>

      </NavigationContainer>
  );
}
// inserindo o AuthProvider todas as rotas terão acesso aos dados do user que estão lá na authprovider

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Sair() {

    useEffect(()=> {
        async function sair(){
            const auth = getAuth();
      
            await signOut(auth);
            
            await AsyncStorage.clear().then( ()=> {
                  setUser(null);
                })
          }
        sair();
      }, []);

    return (
    <View style={styles.container}>

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
  }
});

import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/index'

export default function Profile() {
    const { user, sair } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
    <View style={styles.container}>
      <View>
        <Header />
      </View>
      
      <View style={ styles.areaConteudo }>
        <Text style={styles.nome}> {user.nome} </Text>

        <TouchableOpacity style={styles.botaoRegistrar} onPress={ ()=> { navigation.navigate('Registrar') } }>
          <Text style={ styles.textoBotao }>
              Registrar Gastos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSair} onPress={ ()=> { sair() } }>
          <Text style={styles.textoBotao}>
              Sair
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
  nome:{
    color: 'white',
    fontSize: 30
  },
  textoBotao:{
    color: 'white',
    fontSize: 25
  },
  botaoRegistrar:{
    backgroundColor: '#049301',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    padding: 12,
    marginTop: '5%'
  },
  botaoSair:{
    backgroundColor: '#C62c36',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    padding: 15,
    marginTop: '5%'
  },
  areaConteudo:{
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    marginTop: '-25%'
  }
});

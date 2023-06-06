import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      input: '',
      nome: ''
    }
    this.gravaNome = this.gravaNome.bind(this);
  }

  async componentDidMount(){ // função aonctece sempre quando o componente é montado
    await AsyncStorage.getItem('nome').then((valorPego) => {
      this.setState({nome: valorPego})
    })
  }

  async componentDidUpdate(_,prevState){ // Toda vez que uma state é alterada fazer algo
    const nome = this.state.nome;

    if(prevState !== nome){
      await AsyncStorage.setItem('nome', nome)
    }

  }

  gravaNome(){
    this.setState({
      nome: this.state.input
    });
    alert('Salvo com sucesso');
    Keyboard.dismiss();
  }

  render(){    
    return(
      <View style={styles.container}>

        <View style={styles.areaInput}>
          <TextInput
          style={styles.input}
          value={this.state.input}
          underlineColorAndroid='transparent'
          onChangeText={(texto) => this.setState({input: texto})}
          />

          <TouchableOpacity onPress={this.gravaNome}> 
            <Text style={styles.botao}> + </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.nome}> {this.state.nome} </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    alignItems: 'center'
  },
  input:{
    height: 40,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
  areaInput:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  botao:{
    backgroundColor: '#222',
    color: 'white',
    height: 40,
    padding: 10,
    marginLeft: 5
  },
  nome:{
    fontSize: 30,
    textAlign: 'center',
    marginTop: 15
  }
});

export default App;


import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Pessoas from './src/Pessoas/Pessoas.js';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      feed: [
        {id: '1', nome: 'Rafael', idade: 24, email: 'rafael.redes38@gmail.com'},
        {id: '2',nome: 'Bruna', idade: 24, email: 'bruna.redes38@gmail.com'},
        {id: '3',nome: 'Auricelio', idade: 30, email: 'auricelio.redes38@gmail.com'},
        {id: '4',nome: 'Jardriel', idade: 25, email: 'jardriel.redes38@gmail.com'}
      ]
    };
  }

  render(){    
    return(
      <View style={styles.container}>

        <FlatList 
          data={ this.state.feed }
          renderItem={ ({item}) => <Pessoas data={item} /> }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  areaPessoa:{
    height: 400,
    backgroundColor: '#222',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoPessoa:{
    color: 'white',
    fontSize: 20
  }
});

export default App;


import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: 'Ola'
    }
    this.clique = this.clique.bind(this);
  }

  clique(nome){
    this.setState({ nome: nome})
  }

  render(){    
    return(
      <View style={{ marginTop: 40 }}>
        
        <Button title='Clique Aqui' onPress={() => this.clique('Rafael Lima')}/>

        <Text style={{ fontSize: 30, textAlign: 'center', color: 'darkblue' }}> {this.state.nome} </Text>

      </View>
    );
  }
}

export default App;
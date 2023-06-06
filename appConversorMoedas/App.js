import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Conversor from './src/Conversor';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    return(
        <View style={styles.container}>
          <Conversor moedaA='USD' moedaB='BRL'/>
          <Conversor moedaA='BRL' moedaB='USD'/>
          <Conversor moedaA='EUR' moedaB='BRL'/>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;


import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import api from './src/services/api';
import Filmes from './src/Filmes';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      filmes: [],
      loading: true
    }
  }

  async componentDidMount(){
    const response = await api.get('r-api/?api=filmes');
    this.setState({
      filmes: response.data,
      loading: false
    })
  }

  render(){
    
    if(this.state.loading){
      return(
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color='darkorange' size={100}/>
      </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <FlatList 
          data={this.state.filmes}
          keyExtractor={ item => item.id.toString()}
          renderItem={ ({item}) => <Filmes data={item}/> }        
          />
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    backgroundColor: 'navy'
  }
});

export default App;


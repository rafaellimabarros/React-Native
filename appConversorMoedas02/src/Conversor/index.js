import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api.js';

 //convert?q=USD_BRL&compact=ultra&apiKey=ab5e18eb02210699ae23

class Conversor extends Component{
  constructor(props){
    super(props);
    this.state = {
        moedaA: this.props.moedaA,
        moedaB: this.props.moedaB,
        moedaB_valor: 0,
        valorConvertido: 0
    }
    this.converter = this.converter.bind(this);
  }

  async converter(){
    let de_para = this.state.moedaA + '_' + this.state.moedaB;
    const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=ab5e18eb02210699ae23`);
    let cotacao = response.data[de_para];
    let resultado = (cotacao * parseFloat(this.state.moedaB_valor));
    this.setState({ valorConvertido: resultado});

  }

  render(){    
    return(
      <View style={styles.container}>

        <Text style={styles.titulo}> {this.props.moedaA} para {this.props.moedaB} </Text>

        <TextInput 
        style={styles.areaTexto} 
        placeholder="Ex: 5.45"
        onChangeText={(texto) => this.setState({moedaB_valor: texto})}
        keyboardType="numeric" />

        <TouchableOpacity onPress={this.converter}> 
            <View style={styles.areaBotao}>
                <Text style={styles.textoBotao}> Converter </Text> 
            </View>
        </TouchableOpacity>

        <Text>
            {this.state.valorConvertido} {this.state.moedaB}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo:{
    fontSize: 20
  },
  areaTexto:{
    borderWidth: 1,
    width: 100,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginTop: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },
  areaBotao:{
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBotao:{
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Conversor;
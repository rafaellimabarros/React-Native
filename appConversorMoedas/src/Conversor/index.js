import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import api from '../services/api';

 //convert?q=USD_BRL&compact=ultra&apiKey=ab5e18eb02210699ae23

class Conversor extends Component{
    constructor(props){
        super(props);
        this.state={
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

        this.setState({
            valorConvertido: resultado.toFixed(2)
        });
        Keyboard.dismiss();
    }

  render(){
      const {moedaA, moedaB} = this.props;
    return(
        <View style={styles.container}>
          <Text style={styles.titulo}> {moedaA} para {moedaB} </Text>

          <TextInput 
          placeholder='Valor em USD a ser convertido'
          style={styles.areaInput}
          onChangeText={(moedaB_valor) => this.setState({ moedaB_valor: moedaB_valor})}
          keyboardType='numeric'
          />

          <TouchableOpacity style={styles.botao} onPress={this.converter}>
              <Text style={styles.botaoTexto}> Converter </Text>
          </TouchableOpacity>

          <Text style={styles.valorConvertido}> {(this.state.valorConvertido === 0 ? '' : this.state.valorConvertido)} </Text>


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
        fontSize: 30,
        fontWeight: 'bold',
        color: 'darkblue'
    },
    areaInput:{
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        width: 300,
        height: 50,
        textAlign: 'center',
        marginTop: 20,
        color: 'black',
        borderRadius: 10
    },
    botao:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkblue',
        width: 150,
        height: 50,
        marginTop: 20,
        borderRadius: 10
    },
    botaoTexto:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    valorConvertido:{
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'
    }
  });

export default Conversor;


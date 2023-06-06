import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, Modal } from 'react-native';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      inputAlcool: 0,
      alcool: 0,
      inputGasolina: 0,
      gasolina: 0,
      modalVisivel: false,
      compensa: ''
    }
    this.calcula = this.calcula.bind(this);
  }

  calcula(){
    this.setState({alcool: this.state.inputAlcool, gasolina: this.state.inputGasolina, modalVisivel: true});

  }

  render(){    
    return(
      <View style={styles.container}>

        <Image source={require('./src/logo.png')} style={styles.logo}/>
        <Text style={{color: 'white', fontSize: 25, marginTop: 20, fontWeight: 'bold'}}> Qual a melhor opção? </Text> 

        <View style={styles.areaInput}>
          <Text style={styles.textoInput}>Álcool (preço por litro): </Text>
          <TextInput style={styles.input} onChangeText={(texto)=> this.setState({ inputAlcool: texto})}/>

          <Text style={styles.textoInput}>Gasolina (preço por litro): </Text>
          <TextInput style={styles.input} onChangeText={ (texto2) => this.setState({inputGasolina: texto2})}/>

          <TouchableOpacity onPress={this.calcula}>
            <View style={styles.botao}>
              <Text style={styles.textoBotao}> Calcular </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal animationType='slide' visible={this.state.modalVisivel}>
          <View style={styles.areaModal}>
            <Image source={require('./src/gas.png')} style={styles.logo}/>
            <Text style={{fontSize: 30, color: 'green', fontWeight: 'bold', padding: 20}}> Compensa Usar {parseFloat(this.state.alcool) / parseFloat(this.state.gasolina) <= 0.7 ? 'Álcool' : 'Gasolina'} </Text>

            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}> Com os preços: </Text>
            <Text style={styles.textoModal}> Álcool: R$ {this.state.alcool}</Text>
            <Text style={styles.textoModal}> Gasolina: R$ {this.state.gasolina}</Text>

            <TouchableOpacity onPress={()=> this.setState({modalVisivel: false})}>
            <View style={styles.botaoModal}>
              <Text style={styles.textoBotao}> Calcular Novamente </Text>
            </View>
          </TouchableOpacity>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 40,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    height: 250,
    width: 250
  },
  input:{
    height: 45,
    width: 300,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 18,
    padding: 10
  },
  textoInput:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginTop: 25
  },
  areaInput:{
    marginTop: 40
  },
  botao:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
    marginTop: 40,
    height: 50,
    borderRadius: 15,
  },
  textoBotao:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  areaModal:{
    flex: 1,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center'
  },
  botaoModal:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
    marginTop: 40,
    height: 50,
    borderRadius: 15,
    width: 300
  },
  textoModal:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default App;


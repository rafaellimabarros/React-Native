import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      textoFrase: '',
      img: require('./src/biscoito.png')
    }

    this.quebraBiscoito = this.quebraBiscoito.bind(this);
    this.resetaBiscoito = this.resetaBiscoito.bind(this);

    this.frases = ['Siga em frente', 'Olhe para o lado', 'Se liga na batida do cavaco', 'A vida é um morango', 'Feliz dia das mães'];
  }

  quebraBiscoito(){
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);

    this.setState({
      textoFrase: '" ' + this.frases[numeroAleatorio] + ' "',
      img: require( './src/biscoitoAberto.png')
    })
  }

  resetaBiscoito(){
    this.setState({
      textoFrase: '',
      img: require('./src/biscoito.png')
    })

  }

  render(){    
    return(
      <View style={styles.container}>
        
        <Image source={ this.state.img } style={ styles.img }/>

        <Text style={ styles.textoFrase }> { this.state.textoFrase }</Text>

        <TouchableOpacity style={ styles.botao } onPress = { this.quebraBiscoito}>
          <View style={ styles.btnArea }>
            <Text style={ styles.btnTexto }> Abrir biscoito da sorte </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.botaoResetar } onPress = { this.resetaBiscoito}>
          <View style={ styles.btnArea }>
            <Text style={ styles.btnTexto }> Resetar </Text>
          </View>
        </TouchableOpacity>

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
  img:{
    height: 250,
    width: 250
  },
  textoFrase:{
    fontSize: 20,
    color: 'orange',
    margin: 30,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  botao:{
    width: 250,
    height: 55,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'orange'
  },
  btnArea:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTexto:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange'
  },
  botaoResetar:{
    width: 250,
    height: 55,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'orange',
    marginTop: 20
  }
});

export default App;
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      numero: 0,
      botao: 'Começar',
      ultimo: null
    }
    this.timer = null;

    this.comecar = this.comecar.bind(this);
    this.zerar = this.zerar.bind(this);
  }

  comecar(){
    if(this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({ botao: 'Continuar' })
    }else{
      this.timer = setInterval( () => {
        this.setState({ numero: this.state.numero + 0.1})
      }, 100);
      this.setState({ botao: 'Parar'});
    }    
  }

  zerar(){
    if(this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({ 
      ultimo: this.state.numero,
      numero: 0, 
      botao: 'começar'
    })
  }

  render(){    
    return(
      <View style={styles.container}>
        
        <Image source={ require('./src/cronometro.png')} style={styles.cronometro}/>

        <Text style={ styles.timer }> { this.state.numero.toFixed(1) } </Text>

        <View style={ styles.btnArea }>

          <TouchableOpacity style={ styles.btn } onPress = { this.comecar }>
            <Text style={ styles.btnTexto }> {this.state.botao} </Text>
          </TouchableOpacity>

          <TouchableOpacity style={ styles.btn } onPress = { this.zerar }>
            <Text style={ styles.btnTexto }> Zerar </Text>
          </TouchableOpacity>
        </View>

        <View style={ styles.areaUltimo }>
          <Text style={ styles.textoCorrida }> 
            {this.state.ultimo > 0 ? 'Ultimo Tempo: ' + this.state.ultimo.toFixed(2) + 's' : ''}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkorange'
  },
  timer:{
    marginTop: -160,
    fontSize: 65,
    color: 'white',
    fontWeight: 'bold'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 80,
    height: 40
  },
  btn:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 17,
    borderRadius: 10
  },
  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkorange'
  },
  areaUltimo:{
    marginTop: 40
  },
  textoCorrida:{
    fontSize: 25,
    fontStyle: 'italic',
    color: 'white'
  }
});

export default App;
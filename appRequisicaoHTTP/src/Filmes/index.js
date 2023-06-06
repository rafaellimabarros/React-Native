import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Filmes extends Component{
  render(){   
    const { nome,foto, sinopse } = this.props.data;
    return(
      <View>
          <View style={styles.card}>
            <Text style={styles.titulo}>{nome}</Text>
            <Image source={{uri: foto}} style={styles.foto}/>

            <View style={styles.areaBotao}>
              <TouchableOpacity style={styles.botao} onPress={() => alert(sinopse)}>
                <Text style={styles.botaoTexto}> Sinopse </Text>
              </TouchableOpacity>
            </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    shadowColor: '#000',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 15,
    shadowOffset: {width:0, height: 1},
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.8

  },
  titulo:{
    fontSize: 22,
    padding: 15,
    fontWeight: 'bold'
  },
  foto:{
    height: 250,
    zIndex: 2, // Index menor que o texto leia mais, então o leia mais fica por cima
  },
  areaBotao:{
    alignItems: 'flex-end',
    marginTop: -40,
    zIndex: 9, //Garante que ele vai sobrepor a imagem
  },
  botao:{
    backgroundColor: 'darkorange',
    padding: 3,
    opacity: 1,
    marginRight: 7,
    borderRadius: 5

  },
  botaoTexto:{
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});


export default Filmes;


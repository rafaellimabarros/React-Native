import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export default function HistoricoList( {data} ) {
    const [corTipo, setCorTipo] = useState('despesa');
  return (
    <View style={styles.container}>

        <View style={[styles.tipo, { backgroundColor: data.tipo === 'despesa' ? '#C62c36' : '#049301'  }]}>
            <View style={styles.iconView}>
                <Feather 
                name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'} 
                size={24} 
                color="white" 
                />
                <Text style={styles.textoTipo}> {data.tipo} </Text>
            </View>
        </View>

        <Text style={styles.valor}>
            R$ {data.valor} {data.data}
            
        </Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconView:{
    flexDirection: 'row'
  },
  tipo:{
    backgroundColor: '#049301',
    width: '30%',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: '8%'
  },
  textoTipo:{
    color: 'white',
    fontSize: 16
  },
  valor:{
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '1%',
  }
});

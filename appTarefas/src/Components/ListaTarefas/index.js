import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Feather } from '@expo/vector-icons'; 


export default function ListaTarefas({ data, deletaItem, editaItem }){
    return(
        <View style={styles.container}>

            <TouchableOpacity onPress={()=> deletaItem(data.key)}>
                <Feather name="trash" size={24} color="white" />
            </TouchableOpacity> 

            <View style={styles.areaTextoTarefa}>
                <TouchableWithoutFeedback onPress={()=> editaItem(data)}>
                    <Text style={styles.textoTarefa}> {data.nome} </Text> 
                </TouchableWithoutFeedback>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'deepskyblue',
      marginBottom: '4%',
      borderRadius: 5,
      padding: 16,
      marginHorizontal: '4%'
    },
    textoTarefa:{
        color: 'white'
    },
    areaTextoTarefa:{
        paddingLeft: '2%'
    }
  });
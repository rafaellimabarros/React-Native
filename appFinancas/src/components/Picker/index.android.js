import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Picker as RNPickerSelect } from '@react-native-picker/picker';

export default function Picker({ onChange, tipo }) {
    return (
    <View style={styles.areaPicker}>
      
      <RNPickerSelect 
      selectedValue={tipo}
      onValueChange={(valor)=> onChange(valor)}
      >
        <RNPickerSelect.Item label='Receita' value='receita' />
        <RNPickerSelect.Item label='Despesa' value='despesa' />
        </RNPickerSelect>

    </View>
  );
}

const styles = StyleSheet.create({
  areaPicker: {
    width: '80%',
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'white',
    marginBottom: '3%'
  }
});

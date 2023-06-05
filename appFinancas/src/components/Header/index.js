import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function New() {
  const navigation = useNavigation();
    return (
    <View style={styles.container}>

      <TouchableOpacity onPress={()=> navigation.toggleDrawer()}>
        <Feather name="menu" size={35} color="white" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '10%', marginLeft: '5%'
  }
});

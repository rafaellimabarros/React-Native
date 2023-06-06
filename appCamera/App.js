import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App(){
  return(
    <View style={styles.container}>
      <Text> Rafael Lima Dev React Natives </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  }
}); 

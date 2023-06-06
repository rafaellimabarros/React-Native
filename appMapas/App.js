import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

//-3.744992, -38.508923
//-3.870282, -38.467315 euse
//-3.906254, -38.387486 aquiraz

export default function App(){
  const [lat, setLat] = useState(-3.906254);
  const [long, setLong] = useState(-38.387486);
  const [latDelta, setLatDelta] = useState(0.01);
  const [longDelta, setLongDelta] = useState(0.02);
  const [markers, setMarkers] = useState([
    {key: 0, coords:{latitude: -3.904267, longitude: -38.393258}, title: 'UPA', image: require('./src/assets/upa64.png')},
    {key: 1, coords:{latitude: -3.904915925531482, longitude: -38.38409708282672}, title: 'Hospital Manuel Assunção Pires', image: require('./src/assets/hospital64.png')},
  ])

  /*function clicou(evento){
    alert('Lat: ' + evento.nativeEvent.coordinate.latitude + '\n Long: ' +  evento.nativeEvent.coordinate.longitude);
  }*/

  return(
    <View style={styles.container}>
      <Text> Lat: {lat}  | Long: {long}  </Text>

      <View style={{flexDirection: 'row', margin: '5%'}}>
        <Button title='Fortaleza' onPress={ ()=> { setLat(-3.744992), setLong(-38.508923) } }> </Button>
        <Button title='Euébio' onPress={()=> {setLat(-3.870282), setLong(-38.467315)}} > </Button>
        <Button title='Aquiraz' onPress={()=> {setLat(-3.906254), setLong(-38.387486)}} > </Button>
      </View>

      <MapView 
      style={ styles.mapa} 
      
      region={{
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
      }}
      > 

        {markers.map((marker)=> {
          return(
            <Marker key={marker.key} image={marker.image} coordinate={marker.coords} pinColor={marker.pinColor} title={marker.title}>

            </Marker>
          );
        })}

      </MapView>

      {markers.map((marker)=> {
        return(
          <TouchableOpacity key={marker.key} onPress={()=> {setLat(marker.coords.latitude), setLong(marker.coords.longitude)}}>
            <Text> {marker.title} </Text>
          </TouchableOpacity>
        )
      })}

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapa:{
    width: '95%',
    height: '50%'
  }
}); 

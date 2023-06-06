import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home/index';
import Sobre from './src/pages/Sobre/index';
import Contato from './src/pages/Contato/index';

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                  headerShown: false
                }}             
                 />
                <Stack.Screen 
                name="Sobre" 
                component={Sobre} 
                options={{
                  headerTintColor: 'black',
                  headerTransparent: true
                }}
                />
                <Stack.Screen name='Contato' component={Contato} options={{ headerTransparent: true, headerTitle: 'Contatos'}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

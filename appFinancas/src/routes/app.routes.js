// configuraçõ das telas quando já está logado,
//dentro desse app fica registrado os dados quando o usuário está logado, perfil

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home/index';
import New from '../pages/New';
import Profile from '../pages/Profile';
import Sair from '../components/Sair';
import 'react-native-gesture-handler';


const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator screenOptions={{
            drawerStyle:{backgroundColor:'#1C1C1C'},
            drawerLabelStyle:{ fontWeight: 'bold', fontSize: 18 },
            drawerActiveBackgroundColor: 'green',
            drawerActiveTintColor: 'white',
            drawerItemStyle:{ marginHorizontal: 5 },
            drawerInactiveBackgroundColor: 'darkslategrey',
            drawerInactiveTintColor: 'white',
            headerTintColor: 'green',
            headerTransparent: true,
            headerTitle: '',
            headerShown: false
        }
        
        }
        >
            <AppDrawer.Screen name='Home' component={Home}/>
            <AppDrawer.Screen name='Registrar' component={New} />
            <AppDrawer.Screen name='Perfil' component={Profile}/>
            <AppDrawer.Screen name='Sair' component={Profile}/>
        </AppDrawer.Navigator>
    );
}

export default AppRoutes;
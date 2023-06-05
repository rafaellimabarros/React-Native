// configuração de stack das telas quando não está logado

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingIn from '../pages/SingIn/index';
import SingUp from '../pages/SingUp/index';

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
    return(
            <AuthStack.Navigator>
                <AuthStack.Screen name='SingIn' component={SingIn} options={{ headerShown: false }} />
                <AuthStack.Screen name='SingUp' component={SingUp} options={{ headerTransparent: true, headerTintColor: 'white', headerTitle: '' }} />
            </AuthStack.Navigator>
    );
}

export default AuthRoutes;
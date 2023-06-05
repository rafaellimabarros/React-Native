// esse arquivo verifica se está logado ou não e manda as rotas
import React, { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes(){
    const { signed, loading } = useContext(AuthContext);

    if(loading){ //Se loading for true então
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='green' />
            </View>
        )
    }

    return(
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;

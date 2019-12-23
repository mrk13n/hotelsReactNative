import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Authorization from "./Authorization";
import Registration from "./Registration";

const Auth = props => {
    const [isAuth, setIsAuth] = useState(false);
    const [isReg, setIsReg] = useState(false);

    const pressAuth = () => {
        setIsAuth(true);
        setIsReg(false);
    };

    const pressReg = () => {
        setIsReg(true);
        setIsAuth(false);
    };

    const pressBack = () => {
        setIsReg(false);
        setIsAuth(false);
    };

    return (
        <View style={ styles.container }>
            <Text style={ styles.titleText }>Узнать всю информацию о любых отелях</Text>
            <Text style={ styles.text }>Войдите или зарегистрируйтесь</Text>
            <View style={ styles.button }>
                <Button title="Войти" onPress={ pressAuth } />
                <Button title="Регистрация" onPress={ pressReg } />
            </View>
            <Authorization visible={ isAuth } signUp={ pressReg } back={ pressBack } login={ props.login }/>
            <Registration visible={ isReg } signIn={ pressAuth } back={ pressBack } registration={ props.registration }/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DFCF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 24,
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        color: '#B3ABAE',
        textAlign: 'center'
    },
    button: {
        margin: 10,
        marginTop: 20
    }
});

export default Auth;
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TextInput, Button, Alert } from 'react-native';
const axios = require('axios');

const Authorization = props => {
    const { navigate } = props.navigation;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const URL = 'http://192.168.1.9:3030/api/login/';

    const login = (data) => {
        axios.post(URL, data)
            .then(response => {
                const data = response.data;
                if (data.incorrectPassword) Alert.alert('Пароль неверный!');
                if (data.notFound) Alert.alert('Такого пользователя не существует!');
                if (data.success) navigate('Hotels', { user: data.user });
            })
            .catch(error => console.error(error));
    };

    const changeEmail = (text) => {
        setEmail(text);
    };

    const changePassword = (text) => {
        setPassword(text);
    };

    const signIn = () => {
        const data = {
            email: email,
            password: password
        };
        if (validData(data)) {
            setIsLoading(true);
            login(data);
        }
    };

    if (isLoading) {
        return (
            <View style={ style.container }>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={ style.container }>
                <ScrollView>
                    <Text style={ style.text }>Email</Text>
                    <TextInput placeholder='Email' placeholderTextColor='grey' style={ style.input } onChangeText={ changeEmail } value={ email } />
                    <Text style={ style.text }>Пароль</Text>
                    <TextInput placeholder='Пароль' secureTextEntry={ true } placeholderTextColor='grey' style={ style.input } onChangeText={ changePassword } value={ password } />
                    <View style={ style.button }>
                        <Button title='Вход' onPress={ signIn } />
                        <Button title='Регистрация' onPress={ () => navigate('Registration') } />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DFCF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        margin: 10,
        fontSize: 22
    },
    input: {
        width: 300,
        fontSize: 16,
        color: 'black',
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
    },
    button: {
        margin: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    }
});

const validData = (data) => {
    let valid = true;
    if (data.email.length === 0 || data.password.length === 0) {
        valid = false;
        Alert.alert('Заполните все поля!');
    }
    return valid;
};

export default Authorization;
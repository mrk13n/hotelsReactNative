import React, { useState } from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, View, TextInput, Modal, Button, Alert} from 'react-native';

const Authorization = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeEmail = (text) => {
        setEmail(text);
    };

    const changePassword = (text) => {
        setPassword(text);
    };

    const clear = () => {
        setEmail('');
        setPassword('');
    };

    const signIn = () => {
        const data = {
            email: email,
            password: password
        };
        if (validData(data)) props.login(data);
    };

    const goBack = () => {
        clear();
        props.back();
    };

    const gotToSignUp = () => {
        clear();
        props.signUp();
    };

    return (
        <Modal visible={ props.visible } animationType='slide'>
            <SafeAreaView style={ style.container }>
                <ScrollView>
                    <View style={ style.button }>
                        <Button title='Назад' onPress={ goBack } />
                    </View>
                    <Text style={ style.text }>Email</Text>
                    <TextInput placeholder='Email' placeholderTextColor='grey' style={ style.input } onChangeText={ changeEmail } value={ email } />
                    <Text style={ style.text }>Пароль</Text>
                    <TextInput placeholder='Пароль' secureTextEntry={ true } placeholderTextColor='grey' style={ style.input } onChangeText={ changePassword } value={ password } />
                    <View style={ style.button }>
                        <Button title='Вход' onPress={ signIn } />
                        <Button title='Регистрация' onPress={ gotToSignUp } />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
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
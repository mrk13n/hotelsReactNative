import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, Modal, Button, Alert } from 'react-native';

const Registration = props => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const URL = 'http://192.168.1.9:3030/api/registration/';

    const changeFirstName = (text) => {
        setFirstName(text);
    };

    const changeLastName = (text) => {
        setLastName(text);
    };

    const changeSecondName = (text) => {
      setSecondName(text);
    };

    const changeEmail = (text) => {
        setEmail(text);
    };

    const changePassword = (text) => {
        setPassword(text);
    };

    const changeConfirmPassword = (text) => {
        setConfirmPassword(text);
    };

    const clear = () => {
        setFirstName('');
        setLastName('');
        setSecondName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const signUp = () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            secondName: secondName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
        if (validData(data)) props.registration(data);
    };

    const goBack = () => {
        clear();
        props.back();
    };

    const goToSignIn = () => {
        clear();
        props.signIn();
    };

    return (
        <Modal visible={ props.visible } animationType='slide'>
            <SafeAreaView style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    <View style={ style.button }>
                        <Button title='Назад' style={ style.button } onPress={ goBack } />
                    </View>
                    <Text style={ style.text }>Имя</Text>
                    <TextInput placeholder='Имя' placeholderTextColor='grey' style={ style.input } onChangeText={ changeFirstName } value={ firstName } />
                    <Text style={ style.text }>Фамилия</Text>
                    <TextInput placeholder='Фамилия' placeholderTextColor='grey' style={ style.input } onChangeText={ changeLastName } value={ lastName } />
                    <Text style={ style.text }>Отчество</Text>
                    <TextInput placeholder='Отчество' placeholderTextColor='grey' style={ style.input } onChangeText={ changeSecondName } value={ secondName } />
                    <Text style={ style.text }>Email</Text>
                    <TextInput placeholder='Email' placeholderTextColor='grey' style={ style.input } onChangeText={ changeEmail } value={ email } />
                    <Text style={ style.text }>Пароль</Text>
                    <TextInput placeholder='Пароль' secureTextEntry={ true } placeholderTextColor='grey' style={ style.input } onChangeText={ changePassword } value={ password } />
                    <Text style={ style.text }>Подтверждение пароля</Text>
                    <TextInput placeholder='Подтверждение пароля' secureTextEntry={ true } placeholderTextColor='grey' style={ style.input } onChangeText={ changeConfirmPassword } value={ confirmPassword } />
                    <View style={style.button}>
                        <Button title='Регистрация' onPress={ signUp } />
                        <Button title='Войти' onPress={ goToSignIn } />
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
    if (data.firstName.length === 0 || data.secondName.length === 0 || data.lastName.length === 0 || data.email.length === 0 || data.password.length === 0 || data.confirmPassword.length === 0) {
        valid = false;
        Alert.alert('Заполните все поля!');
    }
    if (data.password !== data.confirmPassword) {
        valid = false;
        Alert.alert('Пароли не совпадают!');
    }
    return valid;
};

export default Registration;
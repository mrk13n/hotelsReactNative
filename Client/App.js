import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
const axios = require('axios');

import Auth from './components/Auth';
import MainWindow from './components/MainWindow';

export default function App() {
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const URL = 'http://192.168.1.9:3030';

    const checkAuth = () => {
        if (isLoading) {
            axios.get(URL + '/api/checkLogin/')
                .then(response => {
                    const data = response.data;
                    if (data.auth) {
                        setUser(data.user);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    Alert.alert(error);
                });
        }
    };

    const registration = (data) => {
        axios.post(URL + '/api/registration/', data)
            .then(response => {
                const data = response.data;
                if (data.isExist) {
                    Alert.alert('Пользователь с таким email уже существует!');
                }
                if (data.newUser) setUser(data.user);
            })
            .catch(error => Alert.alert(error));
    };

    const login = (data) => {
        axios.post(URL + '/api/login/', data)
            .then(response => {
                const data = response.data;
                if (data.incorrectPassword) {
                    Alert.alert('Пароль неверный!');
                }
                if (data.notFound) {
                    Alert.alert('Такого пользователя не существует!');
                }
                if (data.success) {
                    setUser(data.user);
                }
            })
            .catch(error => Alert.alert(error));
    };

    checkAuth();

    if (isLoading) {
        return (
            <View style={ style.container }>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        if (user) {
            return (
                <View style={ style.container }>
                    <MainWindow user={ user }/>
                </View>
            );
        } else {
            return (
                <View style={ style.container }>
                    <Auth registration={ registration } login={ login }/>
                </View>
            );
        }
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6DFCF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

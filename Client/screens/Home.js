import React, { useState } from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import {render} from "react-native-web";
const axios = require('axios');

const Home = props => {
    const { navigate } = props.navigation;
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const URL = 'http://192.168.1.9:3030/api/checkLogin/';

    const checkAuth = () => {
        axios.get(URL)
            .then(response => {
                const data = response.data;
                if (data.auth) setUser(data.user);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    };

    if (isLoading) {
        checkAuth();
        return (
            <View style={ styles.container }>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        if (user) {
            return (navigate('Hotels', { user: user }));
        } else {
            return (
                <View style={ styles.container }>
                    <Text style={ styles.titleText }>Узнать всю информацию о любых отелях</Text>
                    <Text style={ styles.text }>Войдите или зарегистрируйтесь</Text>
                    <View style={ styles.button }>
                        <Button title="Войти" onPress={ () => navigate('Authorization') } />
                        <Button title="Регистрация" onPress={ () => navigate('Registration') } />
                    </View>
                </View>
            );
        }
    }
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

export default Home;
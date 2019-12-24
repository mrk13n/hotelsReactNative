import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const NavBar = props => {

    const getName = (user) => {
        return user.firstName + ' ' + user.lastName;
    };

    const logout = () => {
        props.setIsLoading(true);
        props.logout();
    };

    const exit = () => {
        Alert.alert(
            'Выход',
            'Вы действительно хотите выйти?',
            [
                { text: 'Нет', style: 'cancel' },
                { text: 'Да', onPress: logout },
            ]
        );
    };

    return (
        <View style={ style.container }>
            <View style={ style.name }>
                <TouchableOpacity onPress={ exit }>
                    <Text style={ {color: 'blue'} }>{ getName(props.user) }</Text>
                </TouchableOpacity>
            </View>
            <View style={ style.balance }>
                <Text style={ {color: '#FF4506'} }>{ props.user.balance } $</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 0.1,
        backgroundColor: '#E6DFCF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -15,
        marginBottom: -20
    },
    name: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5
    },
    balance: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 5
    }
});

export default NavBar;
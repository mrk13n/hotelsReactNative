import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button, Modal, Alert } from 'react-native';

import NavBar from "../components/NavBar";

const Room = props => {
    const { navigate, state } = props.navigation;
    const [isLoading, setIsLoading] = useState(false);
    const user = state.params.user;
    const room = state.params.room;
    const logoutURL = '/api/logout/';
    const URL = 'http://192.168.1.9:3030';

    const logout = () => {
        axios.get(URL + logoutURL)
            .then(response => {
                const data = response.data;
                // if (data.end) console.log('logout');
            })
            .catch(error => console.error(error));
    };

    const checkIfBalancePossibleToConfirm = () => {
        if (room.price > user.balance) {
            Alert.alert('Ваш баланас не позволяет забронировать номер!');
        } else {
            Alert.alert('Вы можете забронировать номер!');
        }
    };

    const roomAccessibility = (accessibility) => {
        if (accessibility) {
            return (
                <View style={ style.accessibilityContainer }>
                    <Text style={ style.access }>Доступен</Text>
                    <View style={ style.buttonContainer }>
                        <Button title='Забронировать' onPress={ checkIfBalancePossibleToConfirm } color='green' />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={ style.accessibilityContainer }>
                    <Text style={ style.notAccess }>Недоступен</Text>
                    <View style={ style.buttonContainer }>
                        <Button title='Забронировать' disabled />
                    </View>
                </View>
            );
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
            <View style={ style.container }>
                <NavBar user={ user } logout={ logout } setIsLoading={ setIsLoading } />
                <SafeAreaView style={ style.container }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <View style={ style.titleContainer }>
                            <Text style={ style.title }>Комната { room.room }</Text>
                        </View>
                        <View style={ style.description }>
                            <Text style={ style.subtitle }>Описание: </Text>
                            <Text style={ style.text }>{ room.description }</Text>
                        </View>
                        <View style={ style.infoContainer }>
                            <Text style={ style.subtitle }>Цена: </Text>
                            <Text style={ style.text }>{ room.price } $</Text>
                        </View>
                        <View style={ style.infoContainer }>
                            <Text style={ style.subtitle }>Тип: </Text>
                            <Text style={ style.text }>{ room.type }</Text>
                        </View>
                        { roomAccessibility(room.accessibility) }
                    </ScrollView>
                </SafeAreaView>
            </View>
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
    infoContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        margin: 20,
        fontSize: 24,
        fontWeight: '600'
    },
    subtitle: {
        fontWeight: '500',
        fontSize: 20
    },
    description: {
        padding: 10
    },
    text: {
        fontSize: 20
    },
    accessibilityContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
    },
    access: {
        fontSize: 20,
        color: 'green'
    },
    notAccess: {
        fontSize: 20,
        color: 'red'
    },
    buttonContainer: {
        marginLeft: -10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
});

export default Room;
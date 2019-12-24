import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Modal, Button, TouchableOpacity, Alert } from 'react-native';
const axios = require('axios');

import NavBar from "../components/NavBar";

const Rooms = props => {
    const { navigate, state } = props.navigation;
    const user = state.params.user;
    const hotel = state.params.hotel;
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getRoomsURL = '/api/getRooms/';
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

    const hotelRooms = (room) => {

        const goToRoom = () => {
            navigate('Room', { room: room, user: user });
        };

        return (
            <TouchableOpacity activeOpacity={ 0.6 } key={ room._id } onPress={ goToRoom }>
                <View style={ style.roomContainer }>
                    <Text style={ style.titleRoom }>{ room.room }</Text>
                    <Text>{ room.description }</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const getRooms = (id) => {
        axios.post(URL + getRoomsURL, { hotelId: id})
            .then(response => {
                const data = response.data;
                setRooms(data);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    };

    if (isLoading) {
        getRooms(hotel.id);
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
                    <View style={ style.titleContainer }>
                        <Text style={ style.title }>Комнаты отеля</Text>
                        <Text style={ style.subtitle }>{ hotel.name }</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        { rooms.map(oneRoom => hotelRooms(oneRoom)) }
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
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleRoom: {
        fontSize: 24,
        fontWeight: '700',
    },
    title: {
        fontSize: 22,
        fontWeight: '300'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    roomContainer: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default Rooms;
import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, Text, Modal, Button, TouchableOpacity } from 'react-native';

import rooms from '../data/rooms';
import NavBar from './NavBar';

const Rooms = props => {

    const hotelRooms = (room) => {

        const goToRoom = () => {
            props.selectRoom(room);
            props.goRoom();
        };

        return (
            <TouchableOpacity activeOpacity={ 0.6 } key={ room.id } onPress={ goToRoom }>
                <View style={ style.roomContainer }>
                    <Text style={ style.titleRoom }>{ room.room }</Text>
                    <Text>{ room.description }</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={ props.visible } animationType='slide'>
            <NavBar user={ props.user } />
            <SafeAreaView style={ style.container }>
                <View style={ style.titleContainer }>
                    <Text style={ style.title }>Комнаты отеля</Text>
                    <Text style={ style.subtitle }>{ props.hotel[0].name }</Text>
                    <Button title='Назад' onPress={ props.goBack } />
                </View>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    { rooms.map(oneRoom => {
                        if (oneRoom.hotelId === props.hotel[0].id) return hotelRooms(oneRoom);
                    }) }
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
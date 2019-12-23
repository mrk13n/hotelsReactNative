import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Modal, Image, TouchableOpacity } from 'react-native';

import hotels from '../data/hotels';
import NavBar from './NavBar';

const Hotels = props => {
    const oneHotel = (hotel) => {

        const goToRooms = () => {
            props.selectHotel(hotel);
            props.goRooms();
        };

        return (
            <TouchableOpacity activeOpacity={ 0.6 } key={ hotel.id } onPress={ goToRooms }>
                <View style={ style.hotelContainer }>
                    <Image style={ style.image } source={ hotel.img } />
                    <Text style={ style.titleHotel }>{ hotel.name }</Text>
                    <Text>{ hotel.stars } <Image /></Text>
                    <Text>{ hotel.description }</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={ props.visible } animationType='slide'>
            <NavBar user={ props.user } />
            <SafeAreaView style={ style.container }>
                <View>
                    <Text style={ style.title }>Отели</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    { hotels.map(hotel => oneHotel(hotel)) }
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
    hotelContainer: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 22,
        fontWeight: '500'
    },
    titleHotel: {
        fontSize: 24,
        fontWeight: '700',
    },
    image: {
        width: '100%',
        height: 150,
    }
});

export default Hotels;
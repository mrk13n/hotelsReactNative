import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
const axios = require('axios');

import NavBar from "../components/NavBar";

const Hotels = props => {
    const { navigate, state } = props.navigation;
    const user = state.params.user;
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getHotelsURL = '/api/getHotels/';
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

    const oneHotel = (hotel) => {

        const goToRooms = () => {
            let thisHotel = {
                name: hotel.name,
                id: hotel._id
            };
            navigate('Rooms', { hotel: thisHotel, user: user });
        };

        return (
            <TouchableOpacity activeOpacity={ 0.6 } key={ hotel._id } onPress={ goToRooms }>
                <View style={ style.hotelContainer }>
                    <Image style={ style.image } source={{ uri: hotel.img }} />
                    <Text style={ style.titleHotel }>{ hotel.name }</Text>
                    <Text>{ hotel.stars }</Text>
                    <Text>{ hotel.description }</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const getHotels = () => {
        axios.get(URL + getHotelsURL)
            .then(response => {
                const data = response.data;
                setIsLoading(false);
                setHotels(data);
            })
            .catch(error => console.error(error));
    };

    if (isLoading) {
        getHotels();
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
                    <View>
                        <Text style={ style.title }>Отели</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        { hotels.map(hotel => oneHotel(hotel)) }
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
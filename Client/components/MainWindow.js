import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Hotels from './Hotels';
import Rooms from './Rooms';
import Room from './Room';

const MainWindow = props => {
    const [isVisibleHotels, setIsVisibleHotels] = useState(true);
    const [isVisibleRooms, setIsVisibleRooms] = useState(false);
    const [isVisibleRoom, setIsVisibleRoom] = useState(false);
    const [hotel, setHotel] = useState('');
    const [room, setRoom] = useState('');

    const goHotels = () => {
        setIsVisibleRooms(false);
        setIsVisibleHotels(true);
    };

    const goRooms = () => {
        setIsVisibleHotels(false);
        setIsVisibleRoom(false);
        setIsVisibleRooms(true);
    };

    const goRoom = () => {
        setIsVisibleRooms(false);
        setIsVisibleRoom(true);
    };

    const selectHotel = (hotel) => {
        let currentHotel = [hotel];
        setHotel(currentHotel);
    };

    const selectRoom = (room) => {
        let currentRoom = [room];
        setRoom(currentRoom);
    };

    if (isVisibleHotels) {
        return (
            <Hotels visible={ isVisibleHotels } goRooms={ goRooms } selectHotel={ selectHotel } user={ props.user } />
        );
    } else {
        if (isVisibleRooms) {
            return (
                <Rooms visible={ isVisibleRooms } goBack={ goHotels } goRoom={ goRoom } selectRoom={ selectRoom } hotel={ hotel } user={ props.user } />
            );
        } else {
            return (
                <Room visible={ isVisibleRoom } goBack={ goRooms } room={ room } user={ props.user } />
            );
        }
    }
};

export default MainWindow;
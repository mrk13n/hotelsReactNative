import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Exit from '../components/Exit';

const Hotels = props => {
    const { navigate, state } = props.navigation;
    const [user, setUser] = useState(state.params.user);
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [exit, setExit] = useState(false);
    const URL = 'http://138.68.12.218:3030/api/getHotels/';
    const getUserURL = 'http://138.68.12.218:3030/api/getUser/';
    Exit(exit, navigate, setIsError);

    useEffect(() => {
        const abortController = new AbortController();

        const getHotels = async () => {
            try {
                const response = await fetch(URL, { signal: abortController.signal });
                const data = await response.json();
                setHotels(data);
                setIsLoading(false);
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        const getUser = async (id) => {
            try {
                const settings = {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id })
                };
                const response = await fetch(getUserURL, settings);
                const data = await response.json();
                if (data.notFound) setIsError(true);
                if (!data.notFound) setUser(data.user);
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        getHotels().then(getUser(user.id));

        return () => {
            abortController.abort();
        }
    }, [URL]);

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
                <HotelContainer>
                    <ImageContainer source={{ uri: hotel.img }} />
                    <PrimaryHotelText>{ hotel.name }</PrimaryHotelText>
                    <GeneralText>{ hotel.stars }</GeneralText>
                    <GeneralText>{ hotel.description }</GeneralText>
                </HotelContainer>
            </TouchableOpacity>
        );
    };

    if (isError) {
        return (
            <Container>
                <LoadingText>Произошла ошыбка!</LoadingText>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container>
                <LoadingText>Загрузка...</LoadingText>
            </Container>
        );
    }

    return (
        <Container>
            <NavBar user={ user } setExit={ setExit } setIsLoading={ setIsLoading } />
            <Container>
                <PrimaryText>Отели</PrimaryText>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    { hotels.map(hotel => oneHotel(hotel)) }
                </ScrollView>
            </Container>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    flex: 1;
    backgroundColor: #E6DFCF;
    alignItems: center;
    justifyContent: center;
`;

const HotelContainer = styled.View`
    backgroundColor: #fff;
    margin: 5px;
    padding: 10px;
    flexDirection: row;
    border: 1px solid grey;
    border-radius: 10px;
    flexWrap: wrap;
`;

const LoadingText = styled.Text`
    font-size: 30px;
    text-align: center;
    color: #B3ABAE;
`;

const PrimaryText = styled.Text`
    font-size: 24px;
    text-align: center;
`;

const PrimaryHotelText = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const GeneralText = styled.Text`
    font-size: 15px;
    color: #7D7D7D;
`;

const ImageContainer = styled.Image`
    width: 100%;
    height: 150px;
`;

export default Hotels;

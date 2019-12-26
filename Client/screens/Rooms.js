import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, } from 'react-native';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Exit from '../components/Exit';
import CustomButton from '../components/CustomButton';

const Rooms = props => {
    const { navigate, state, goBack } = props.navigation;
    const user = state.params.user;
    const hotel = state.params.hotel;
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [exit, setExit] = useState(false);
    const URL = 'http://138.68.12.218:3030/api/getRooms/';
    Exit(exit, navigate, setIsError);

    useEffect(() => {
        const abortController = new AbortController();

        const getRooms = async (id) => {
            try {
                const post = {
                    signal: abortController.signal,
                    hotelId: id
                };
                const settings = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post)
                };
                const response = await fetch(URL, settings);
                const data = await response.json();
                setRooms(data);
                setIsLoading(false);
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(false);
            }
        };

        getRooms(hotel.id);

        return () => {
            abortController.abort();
        }
    }, [URL]);

    const hotelRooms = (room) => {

        const goToRoom = () => {
            navigate('Room', { room: room, user: user });
        };

        return (
            <TouchableOpacity activeOpacity={ 0.6 } key={ room._id } onPress={ goToRoom }>
                <RoomContainer>
                    <PrimaryText>{ room.room }</PrimaryText>
                    <GeneralText>{ room.description }</GeneralText>
                </RoomContainer>
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
                <TitleContainer>
                    <PrimaryText>Комнаты отеля</PrimaryText>
                    <PrimaryHotelText>{ hotel.name }</PrimaryHotelText>
                    <ButtonsContainer>
                        <CustomButton text='Назад' textColor='white' backgroundColor='#5A58FF' onPress={ () => goBack() } />
                    </ButtonsContainer>
                </TitleContainer>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    { rooms.map(oneRoom => hotelRooms(oneRoom)) }
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

const TitleContainer = styled.View`
    alignItems: center;
    justifyContent: center;
`;

const RoomContainer = styled.View`
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

const ButtonsContainer = styled.View`
    margin: 10px;
    alignItems: center;
`;

export default Rooms;

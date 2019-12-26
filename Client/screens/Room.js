import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Exit from '../components/Exit';
import CustomButton from '../components/CustomButton';
import GetUser from '../components/GetUser';

const Room = props => {
    const { navigate, state, goBack } = props.navigation;
    const room = state.params.room;
    const [user, setUser] = useState(state.params.user);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [exit, setExit] = useState(false);
    Exit(exit, navigate, setIsError);
    GetUser(user.id, setUser, setIsError);

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
                <AccessibilityContainer>
                    <AccessibilityText color='green'>Доступен</AccessibilityText>
                    <ButtonsContainer>
                        <CustomButton text='Забронировать' textColor='white' backgroundColor='green' onPress={ checkIfBalancePossibleToConfirm } />
                    </ButtonsContainer>
                </AccessibilityContainer>
            );
        } else {
            return (
                <AccessibilityContainer>
                    <AccessibilityText color='red'>Недоступен</AccessibilityText>
                    <ButtonsContainer>
                        <CustomButton text='Забронировать' textColor='red' backgroundColor='#A2A3A8' disabled={ true } />
                    </ButtonsContainer>
                </AccessibilityContainer>
            );
        }
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
                <ScrollView showsVerticalScrollIndicator={ false }>
                    <TitleContainer>
                        <PrimaryHotelText>Комната { room.room }</PrimaryHotelText>
                    </TitleContainer>
                    <DescriptionContainer>
                        <PrimaryText>Описание: </PrimaryText>
                        <GeneralText>{ room.description }</GeneralText>
                    </DescriptionContainer>
                    <InfoContainer>
                        <PrimaryText>Цена: </PrimaryText>
                        <GeneralText>{ room.price }$</GeneralText>
                    </InfoContainer>
                    <InfoContainer>
                        <PrimaryText>Тип: </PrimaryText>
                        <GeneralText>{ room.type }</GeneralText>
                    </InfoContainer>
                    { roomAccessibility(room.accessibility) }
                    <ButtonsContainer>
                        <CustomButton text='Назад' textColor='white' backgroundColor='#5A58FF' onPress={ () => goBack() } />
                    </ButtonsContainer>
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

const DescriptionContainer = styled.View`
    padding: 10px;
    alignItems: flex-start;
`;

const InfoContainer = styled.View`
    alignItems: flex-start;
    justifyContent: flex-start;
    flexDirection: row;
    padding: 10px
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
    font-size: 24px;
    color: #7D7D7D;
    margin-left: 5px
`;

const ButtonsContainer = styled.View`
    margin: 10px;
    alignItems: center;
`;

const AccessibilityContainer = styled.View`
    alignItems: center;
    justifyContent: center;
    padding: 10px
`;

const AccessibilityText = styled.Text`
    font-size: 22px;
    font-weight: bold;    
    color: ${ props => props.color }
`;

export default Room;

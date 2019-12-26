import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';

const NavBar = props => {

    const getName = (user) => {
        return user.firstName + ' ' + user.lastName;
    };

    const logout = () => {
        props.setIsLoading(true);
        props.setExit(true);
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
        <Container>
            <NameContainer>
                <TouchableOpacity onPress={ exit }>
                    <GeneralText color='#5A58FF'>{ getName(props.user) }</GeneralText>
                </TouchableOpacity>
            </NameContainer>
            <BalanceContainer>
                <GeneralText color='#59B566'>{ props.user.balance }$</GeneralText>
            </BalanceContainer>
        </Container>
    );
};

const Container = styled.SafeAreaView`
    flex: 0.1;
    backgroundColor: #E6DFCF;
    flexDirection: row;
    alignItems: center;
    justifyContent: center;
    margin-top: -10px;
    margin-bottom: -20px;
`;

const NameContainer = styled.View`
    flex: 1;
    padding: 5px;
`;

const BalanceContainer = styled.View`
    flex: 1;
    alignItems: flex-end;
    justifyContent: flex-end;
    padding: 5px;
`;

const GeneralText = styled.Text`
    color: ${ props => props.color };
`;

export default NavBar;
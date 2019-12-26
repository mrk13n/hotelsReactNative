import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomButton from '../components/CustomButton';

const Home = props => {
    const { navigate } = props.navigation;
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const URL = 'http://192.168.1.11:3030/api/checkLogin/';

    useEffect(() => {
        const abortController = new AbortController();

        const checkAuth = async () => {
            try {
                const response = await fetch(URL, { signal: abortController.signal });
                const data = await response.json();
                if (data.auth) {
                    navigate('Hotels', { user: data.user });
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        checkAuth();

        return () => {
            abortController.abort();
        }
    }, [URL]);

    if (isError) {
        return (
            <Container>
                <LoadingText>Поизошла ошыбка!</LoadingText>
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
            <PrimaryText>Узнать всю информацию о любых отелях</PrimaryText>
            <SecondText>Войдите или зарегистрируйтесь</SecondText>
            <ButtonsContainer>
                <CustomButton text='Войти' textColor='white' backgroundColor='#5A58FF' onPress={ () => navigate('Authorization') }/>
                <CustomButton text='Регистрация' textColor='white' backgroundColor='#5A58FF' onPress={ () => navigate('Registration') } />
            </ButtonsContainer>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    backgroundColor: #E6DFCF;
    alignItems: center;
    justifyContent: center;
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

const SecondText = styled.Text`
    font-size: 20px;
    color: #B3ABAE;
    text-align: center;
`;

const ButtonsContainer = styled.View`
    padding: 25px;
    margin: 10px;
`;

export default Home;
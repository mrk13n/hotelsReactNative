import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import styled from 'styled-components';
import CustomButton from '../components/CustomButton';

const Authorization = props => {
    const { navigate, goBack } = props.navigation;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [post, setPost] = useState(null);
    const [log, setLog] = useState(false);
    const URL = 'http://192.168.1.11:3030/api/login/';

    useEffect(() => {
        const abortController = new AbortController();

        const login = async (post) => {
            try {
                const settings = {
                    method: 'POST',
                    signal: abortController.signal,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post)
                };
                const response = await fetch(URL, settings);
                const data = await response.json();
                if (data.incorrectPassword) Alert.alert('Пароль неверный!');
                if (data.notFound) Alert.alert('Такого пользователя не существует!');
                if (data.success) {
                    navigate('Hotels', {user: data.user});
                } else {
                    setIsLoading(false);
                    setLog(false);
                }
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        if (log) login(post);

        return () => {
            abortController.abort();
        }
    }, [log]);

    const changeEmail = (text) => {
        setEmail(text);
    };

    const changePassword = (text) => {
        setPassword(text);
    };

    const signIn = () => {
        const data = {
            email: email,
            password: password
        };
        if (validData(data)) {
            setIsLoading(true);
            setPost(data);
            setLog(true);
        }
    };

    const validData = (data) => {
        let valid = true;
        if (data.email.length === 0 || data.password.length === 0) {
            valid = false;
            Alert.alert('Заполните все поля!');
        }
        return valid;
    };

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
            <ScrollView>
                <ButtonsContainer>
                    <CustomButton text='Назад' textColor='white' backgroundColor='#5A58FF' onPress={ () => goBack() }/>
                </ButtonsContainer>
                <PrimaryText>Email</PrimaryText>
                <Input placeholder='Email' placeholderTextColor='grey' onChangeText={ changeEmail } value={ email } />
                <PrimaryText>Пароль</PrimaryText>
                <Input placeholder='Пароль' secureTextEntry={ true } placeholderTextColor='grey' onChangeText={ changePassword } value={ password } />
                <ButtonsContainer>
                    <CustomButton text='Войти' textColor='white' backgroundColor='#5A58FF' onPress={ signIn } />
                    <CustomButton text='Регистрация' textColor='white' backgroundColor='#5A58FF' onPress={ () => navigate('Registration') } />
                </ButtonsContainer>
            </ScrollView>
        </Container>
    );
};

const Container = styled.SafeAreaView`
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

const ButtonsContainer = styled.View`
    margin: 10px;
    alignItems: center;
`;

const Input = styled.TextInput`
    width: 300px;
    color: black;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`;

export default Authorization;
import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import styled from 'styled-components';
import CustomButton from '../components/CustomButton';

const Registration = props => {
    const { navigate, goBack } = props.navigation;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [post, setPost] = useState(null);
    const [log, setLog] = useState(false);
    const URL = 'http://138.68.12.218/api/registration/';

    useEffect(() => {
        const abortController = new AbortController();

        const registration = async (post) => {

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
                if (data.isExist) Alert.alert('Пользователь с таким email уже существует!');
                if (data.newUser) {
                    navigate('Hotels', { user: data.user });
                } else {
                    setIsLoading(false);
                    setLog(false);
                }
            } catch (error) {
                if (!abortController.signal.aborted) setIsError(true);
            }
        };

        if (log) registration(post);

        return () => {
            abortController.abort();
        }
    }, [log]);

    const changeFirstName = (text) => {
        setFirstName(text);
    };

    const changeLastName = (text) => {
        setLastName(text);
    };

    const changeSecondName = (text) => {
        setSecondName(text);
    };

    const changeEmail = (text) => {
        setEmail(text);
    };

    const changePassword = (text) => {
        setPassword(text);
    };

    const changeConfirmPassword = (text) => {
        setConfirmPassword(text);
    };

    const signUp = () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            secondName: secondName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
        if (validData(data)) {
            setIsLoading(true);
            setPost(data);
            setLog(true);
        }
    };

    const validData = (data) => {
        let valid = true;
        if (data.firstName.length === 0 || data.secondName.length === 0 || data.lastName.length === 0 || data.email.length === 0 || data.password.length === 0 || data.confirmPassword.length === 0) {
            valid = false;
            Alert.alert('Заполните все поля!');
        }
        if (data.password !== data.confirmPassword) {
            valid = false;
            Alert.alert('Пароли не совпадают!');
        }
        return valid;
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
            <ScrollView showsVerticalScrollIndicator={ false }>
                <ButtonsContainer>
                    <CustomButton text='Назад' textColor='white' backgroundColor='#5A58FF' onPress={ () => goBack() }/>
                </ButtonsContainer>
                <PrimaryText>Имя</PrimaryText>
                <Input placeholder='Имя' placeholderTextColor='grey' onChangeText={ changeFirstName } value={ firstName } />
                <PrimaryText>Фамилия</PrimaryText>
                <Input placeholder='Фамилия' placeholderTextColor='grey' onChangeText={ changeLastName } value={ lastName } />
                <PrimaryText>Отчество</PrimaryText>
                <Input placeholder='Отчество' placeholderTextColor='grey' onChangeText={ changeSecondName } value={ secondName } />
                <PrimaryText>Email</PrimaryText>
                <Input placeholder='Email' placeholderTextColor='grey' onChangeText={ changeEmail } value={ email } />
                <PrimaryText>Пароль</PrimaryText>
                <Input placeholder='Пароль' secureTextEntry={ true } placeholderTextColor='grey' onChangeText={ changePassword } value={ password } />
                <PrimaryText>Подтверждение пароля</PrimaryText>
                <Input placeholder='Подтверждение пароля' secureTextEntry={ true } placeholderTextColor='grey' onChangeText={ changeConfirmPassword } value={ confirmPassword } />
                <ButtonsContainer>
                    <CustomButton text='Регистрация' textColor='white' backgroundColor='#5A58FF' onPress={ signUp } />
                    <CustomButton text='Вход' textColor='white' backgroundColor='#5A58FF' onPress={ () => navigate('Authorization') } />
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

export default Registration;
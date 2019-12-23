import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Button, Modal, Alert } from 'react-native';
import NavBar from './NavBar';

const Room = props => {

    const roomAccessibility = (accessibility) => {
        if (accessibility) {
            return (
                <View style={ style.accessibilityContainer }>
                    <Text style={ style.access }>Доступен</Text>
                    <View style={ style.buttonContainer }>
                        <Button title='Забронировать' onPress={() => Alert.alert('Your accessibility ' + accessibility)} color='green' />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={ style.accessibilityContainer }>
                    <Text style={ style.notAccess }>Недоступен</Text>
                    <View style={ style.buttonContainer }>
                        <Button title='Забронировать' disabled />
                    </View>
                </View>
            );
        }
    };

    return (
        <Modal visible={ props.visible } animationType='slide'>
            <NavBar user={ props.user } />
            <SafeAreaView style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={ false }>
                    <View style={ style.titleContainer }>
                        <Text style={ style.title }>Комната { props.room[0].room }</Text>
                    </View>
                    <View style={ style.description }>
                        <Text style={ style.subtitle }>Описание: </Text>
                        <Text style={ style.text }>{ props.room[0].description }</Text>
                    </View>
                    <View style={ style.infoContainer }>
                        <Text style={ style.subtitle }>Цена: </Text>
                        <Text style={ style.text }>{ props.room[0].price } $</Text>
                    </View>
                    <View style={ style.infoContainer }>
                        <Text style={ style.subtitle }>Тип: </Text>
                        <Text style={ style.text }>{ props.room[0].type }</Text>
                    </View>
                    { roomAccessibility(props.room[0].accessibility) }
                    <Button title='Назад' onPress={ props.goBack } />
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
    infoContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        margin: 20,
        fontSize: 24,
        fontWeight: '600'
    },
    subtitle: {
        fontWeight: '500',
        fontSize: 20
    },
    description: {
        padding: 10
    },
    text: {
        fontSize: 20
    },
    accessibilityContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
    },
    access: {
        fontSize: 20,
        color: 'green'
    },
    notAccess: {
        fontSize: 20,
        color: 'red'
    },
    buttonContainer: {
        marginLeft: -10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
});

export default Room;
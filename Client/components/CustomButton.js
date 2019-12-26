import React from 'react';
import styled from 'styled-components'

const CustomButton = props => (
    <ButtonContainer disabled={ props.disabled } activeOpacity={ 0.5 } backgroundColor={ props.backgroundColor } onPress={ props.onPress }>
        <ButtonText textColor={ props.textColor }>{ props.text }</ButtonText>
    </ButtonContainer>
);

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity`
    width: 200px;
    height: 30px;
    padding 12px;
    border-radius: 10px;
    margin: 2%;
    background-color: ${ props => props.backgroundColor };
`;

const ButtonText = styled.Text`
    font-size: 24px;
    color: ${ props => props.textColor };
    text-align: center;
`;
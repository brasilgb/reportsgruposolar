import styled from "styled-components";
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
export const BoxHome = ({ children, startColor, endColor, alignItems, justifyContent }) => {
    return (
        <LinearGradient
            colors={[startColor, endColor]}
            style={{ flex: 1, alignItems: alignItems, justifyContent: justifyContent }}
            start={{ x: 0.1, y: 1 }}
            end={{ x: 0., y: 0.3 }}
        >
            {children}
        </LinearGradient>
    );
};


export const ContainerPortal = styled.View`
flex: 4;
align-items: center;
justify-content: center;
`;

export const LButtonMaster = styled.TouchableOpacity`
margin: 10px 0 10px 0;
background-color: ${props => props.bgcolor};
width: 320px;
height: 100px;
align-items: center;
justify-content: center;
elevation: 6;
border-radius: 5px;
border-width: 2px;
border-color: #FFF;
margin-bottom: 20px;
`;

export const TextAtualiza = styled.Text`
font-size: 14px;
font-family: 'Roboto_700Bold';
color: ${props => props.color ? props.color : "#FFF"};
text-align: center;
text-transform: uppercase;
margin: 0px 0px 5px;
`;
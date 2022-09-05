import styled from "styled-components";
import React from 'react';

export const BoxHome = styled.SafeAreaView`
flex: 1;
background-color: ${props => props.bgcolor};
`;

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
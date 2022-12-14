import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../../contexts/auth';
import Calendar from '../../Calendar';
import { BoxAtualiza, BoxTextAtualiza, InfoHeader, InfoLogged, TitleAtualiza, TopBarHome } from './style';

export default function HeaderHome({ dtatu, startColor, endColor, title, subTitle, textColor, barStyle, bgStatus }) {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    return (

        <TopBarHome
            startColor={startColor}
            endColor={endColor}
            textColor={textColor}
            alignItems="center"
            justifyContent="center"
        >
            <StatusBar style={barStyle} backgroundColor={bgStatus} />

            <InfoLogged>
                <InfoLogged.Left>
                    <Icon name="ios-arrow-back-circle" size={22} color={textColor} onPress={() => navigation.goBack()} />
                </InfoLogged.Left>

                <InfoLogged.Middle>
                    <InfoLogged.Title color={textColor}>
                        {user.Name}
                    </InfoLogged.Title>
                </InfoLogged.Middle>

                <InfoLogged.Right>
                    <Icon name="ios-home-sharp" 
                    size={22} 
                    color={textColor} 
                    onPress={() => navigation.dispatch(StackActions.popToTop)} />
                </InfoLogged.Right>
            </InfoLogged>

            <InfoHeader>
                <InfoHeader.Title color={textColor}>
                    {title}
                </InfoHeader.Title>
                <InfoHeader.SubTitle color={textColor}>
                    {subTitle}
                </InfoHeader.SubTitle>
            </InfoHeader>

            <BoxAtualiza bgcolor="#FFF">
                <BoxTextAtualiza>
                    <TitleAtualiza color="#555">
                        {dtatu}
                    </TitleAtualiza>
                </BoxTextAtualiza>
                <Calendar color={endColor} />
            </BoxAtualiza>

        </TopBarHome>
    );
}
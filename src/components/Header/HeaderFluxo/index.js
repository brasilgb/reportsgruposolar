import { StackActions, useNavigation } from '@react-navigation/native';
import React, { Fragment, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../../contexts/auth';
import { BoxAtualiza, BoxTextAtualiza, InfoHeader, InfoLogged, TitleAtualiza, TopBarHome } from './style';
import CalendarRange from '../../CalendarRange';

export default function HeaderFluxo({ dtatu, startColor, endColor, title, subTitle, textColor, barStyle, bgStatus }) {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <Fragment>
            <StatusBar style={barStyle} backgroundColor={bgStatus} />
            <TopBarHome
                startColor={startColor}
                endColor={endColor}
                textColor={textColor}
                alignItems="center"
                justifyContent="center"
            >

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
                    <InfoHeader.SubTitle color={textColor}>
                        {dtatu}
                    </InfoHeader.SubTitle>

                </InfoHeader>
                <CalendarRange color={textColor} />
            </TopBarHome>
        </Fragment>
    );
}
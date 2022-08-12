import React from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import { BoxTextAtualiza, InfoHeader, InfoLogged, TitleAtualiza, TopBarHome } from './style';

export default function HeaderPage({ startColor, endColor, title, subTitle, dtatu, textColor }) {

    const navigation = useNavigation();

    return (

        <TopBarHome
            startColor={startColor}
            endColor={endColor}
            textColor={textColor}
            alignItems="center"
            justifyContent="center"
        >
            <InfoLogged>
                <InfoLogged.Left>
                    <Icon name="ios-arrow-back-circle" size={20} color={textColor} onPress={() => navigation.goBack()} />
                </InfoLogged.Left>

                <InfoLogged.Middle>
                    <InfoLogged.Title>

                    </InfoLogged.Title>
                </InfoLogged.Middle>

                <InfoLogged.Right>
                    <Icon name="ios-home-sharp" size={20} color={textColor} onPress={() => navigation.dispatch(StackActions.popToTop)} />
                </InfoLogged.Right>
            </InfoLogged>

            <InfoHeader>
                <InfoHeader.Title color={textColor}>
                   { title}
                </InfoHeader.Title>
                <InfoHeader.SubTitle color={textColor}>
                    { subTitle }
                </InfoHeader.SubTitle>

                <BoxTextAtualiza>
                    <TitleAtualiza color={textColor}>
                        { dtatu }
                    </TitleAtualiza>
                </BoxTextAtualiza>
            </InfoHeader>

        </TopBarHome>
    );
}
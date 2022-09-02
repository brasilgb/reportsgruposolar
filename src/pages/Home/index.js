import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import HeaderPortal from '../../components/Header/Portal';
import { useNavigation } from '@react-navigation/native';
import { LButtonMaster, BoxHome, ContainerPortal } from './style';
import { AuthContext } from '../../contexts/auth';

export default function Home() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    return (

        <BoxHome
            startColor="#00a8ea"
            endColor="#009DE0" // Meio
            alignItems="center"
            justifyContent="center"
        >
            <HeaderPortal
                startColor="#009DE0" // Meio
                endColor="#009DE0"
                textColor="#FFF"
                title="Grupo Solar"
                subTitle="Relatórios Administrativos"
                bgStatus="#00a8ea"
                barStyle="light"
            />
            <ContainerPortal>

                {user.lengthGrupo === 0 &&
                    <View style={styles.messageBox}>
                        <Text style={styles.messageText}>
                            O seu usuário não têm permissão para acessar relatórios do Grupo Solar. Caso haja necessidade, solicite acesso junto ao setor TI Sistemas.
                        </Text>
                    </View>
                }

                {user.levelLoja &&
                    <LButtonMaster
                        bgcolor="#004099"
                        onPress={() => navigation.navigate('LojasScreen')}
                    >
                        <Image source={require('../../../assets/images/solar.png')} />
                    </LButtonMaster>
                }

                {user.levelNatur &&
                    <LButtonMaster
                        bgcolor="#F5AB00"
                        onPress={() => navigation.navigate('NaturScreen')}
                    >
                        <Image source={require('../../../assets/images/natur.png')} />
                    </LButtonMaster>
                }

                {user.levelSuper &&
                    <LButtonMaster
                        bgcolor="#EB6909"
                        onPress={() => navigation.navigate('SuperScreen')}
                    >
                        <Image source={require('../../../assets/images/super.png')} />
                    </LButtonMaster>
                }

            </ContainerPortal>
        </BoxHome>

    );
}

const styles = StyleSheet.create({
    messageBox: {
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 2,
        marginHorizontal: 10
    },
    messageText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#DB354C'
    }
})
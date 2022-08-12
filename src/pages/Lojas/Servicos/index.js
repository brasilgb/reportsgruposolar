import React, { useContext, useEffect, useState } from 'react';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { AuthContext } from '../../../contexts/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import SCompDiario from './CompDiario';
import SPerformance from './Performance';
import SPerformanceDia from './PerformanceDia';
import SPerformanceMes from './PerformanceMes';
import api from '../../../services/api';
const ServicoTab = createMaterialTopTabNavigator();

export default function LServicos() {
    
    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [serTotais, setSerTotais] = useState(0);

    // Extração de dados resumos totais
    useEffect(() => {
            async function getSerTotais() {
                await api.get(`sertotais/${dtFormatada(dataFiltro)}`)
                    .then(sertotais => {
                        setSerTotais(sertotais);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            getSerTotais();
        }, [dataFiltro]);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#014D9B"
                endColor="#0A3B7E"
                textColor="#FFF"
                title="Lojas Solar"
                subTitle="Serviços"
                dtatu={moment(serTotais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
            />
            <TabContainer>
                <ServicoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 12 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#fdfdfd' },
                        tabBarIndicatorStyle: {backgroundColor: '#0A3B7E'},
                        tabBarPressColor: '#014D9B'
                    }}
                >
                    <ServicoTab.Screen name="Compar. Diário" component={SCompDiario} />
                    <ServicoTab.Screen name="Perform. Mês" component={SPerformanceMes} />
                    <ServicoTab.Screen name="Perform. Dia." component={SPerformanceDia} />
                    <ServicoTab.Screen name="Perform. 12 Meses" component={SPerformance} />
                </ServicoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
}
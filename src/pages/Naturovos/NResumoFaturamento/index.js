import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();

import { AuthContext } from '../../../contexts/auth';
import NResFaturamento from './NResFaturamento';
import NGrafEvolucao from './NGrafEvolucao';
import api from '../../../services/api';

export default function NResumoFaturamento() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [nResTotal, setNResTotal] = useState([]);

    useEffect(() => {
        async function getNResTotal() {
            await api.get(`nrestotais/${dtFormatada(dataFiltro)}`)
                .then(nrestotais => {
                    setNResTotal(nrestotais.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNResTotal();
    }, [dataFiltro]);

    return (
        <BoxHome>
            <HeaderPage
                startColor="#fcbc32"
                endColor="#F5AB00"
                textColor="#333"
                title="Naturovos"
                subTitle="ADM Resumo"
                dtatu={moment(nResTotal[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
                bgStatus="#F5AB00"
                barStyle='light-content'
            />
            <TabContainer>
                <ResumoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#f1f1f1' },
                        tabBarIndicatorStyle: { backgroundColor: '#F5AB00' },
                        tabBarPressColor: '#fcbc32'
                    }}
                >
                    <ResumoTab.Screen name="Resumo Faturamento" component={NResFaturamento} />
                    <ResumoTab.Screen name="Gr??fico Evolu????o" component={NGrafEvolucao} />
                </ResumoTab.Navigator>
            </TabContainer>
        </BoxHome>
    );
} 
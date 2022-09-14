import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import HeaderPage from '../../../components/Header/Page';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const ResumoTab = createMaterialTopTabNavigator();
import { AuthContext } from '../../../contexts/auth';
import api from '../../../services/api';
import FluxoParcial from './FluxoParcial';
import FluxoTotal from './FluxoTotal';

export default function NFluxo() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [totais, setTotais] = useState(0);

    // Extração de dados resumos totais
    useEffect(() => {
        async function getTotais() {
            await api.get(`totais/${dtFormatada(dataFiltro)}`)
                .then(totais => {
                    const tot = totais.data.filter((dep) => (dep.Departamento === 1));
                    setTotais(tot);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getTotais();
    }, [dataFiltro]);

    return (
        <BoxHome>

            <HeaderPage
                startColor="#014D9B"
                endColor="#0A3B7E"
                textColor="#FFF"
                title="Lojas Solar"
                subTitle="Resumo de Faturamento"
                dtatu={moment(totais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
                bgStatus="#0A3B7E"
                barStyle='light'
            />

            <TabContainer>
                <ResumoTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14 },
                        // tabBarItemStyle: { width: 125 },
                        tabBarStyle: { backgroundColor: '#fdfdfd' },
                        tabBarIndicatorStyle: { backgroundColor: '#0A3B7E' },
                        tabBarPressColor: '#014D9B'
                    }}
                >
                    <ResumoTab.Screen name="Fluxo" component={FluxoParcial} />
                    <ResumoTab.Screen name="Fluxo Geral" component={FluxoTotal} />
                </ResumoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
} 
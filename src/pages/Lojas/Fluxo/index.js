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
import fluxo from '../../../services/fluxo';
import HeaderFluxo from '../../../components/Header/HeaderFluxo';

export default function LFluxo() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [fluxoData, setFluxoData] = useState([]);
    const [loading, setLoading] = useState(true);
    // Extração de dados resumos totais
    useEffect(() => {
        async function getFluxoCaixa() {

            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 1,
                "fluxoDatini": 20220912,
                "fluxoDatfin": 20220912
            })
                .then((response) => {
                    setLoading(false);
                    setFluxoData(response.data.bi054.bidata); 
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getFluxoCaixa();
    });

    return (
        <BoxHome>

            <HeaderFluxo
                startColor="#014D9B"
                endColor="#0A3B7E"
                textColor="#FFF"
                title="Lojas Solar"
                subTitle="Fluxo de Caixa"
                dtatu={fluxoData.filter((n1) => (n1.ordem === 1)).map((a) => (a.atualizacao))}
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
                    <ResumoTab.Screen name="Fluxo Lojas" component={FluxoParcial} />
                    <ResumoTab.Screen name="Fluxo Grupo" component={FluxoTotal} />
                </ResumoTab.Navigator>
            </TabContainer>

        </BoxHome>
    );
} 
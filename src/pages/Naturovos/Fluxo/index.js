import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { BoxHome, TabContainer } from '../../style';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthContext } from '../../../contexts/auth';
import FluxoParcial from './FluxoParcial';
import FluxoTotal from './FluxoTotal';
import fluxo from '../../../services/fluxo';
import CalendarRange from '../../../components/CalendarRange';
import { ContainerButtomFluxo, LButtomFluxo } from '../../Naturovos/Fluxo/style';
import HeaderPage from '../../../components/Header/Page';
import { View } from 'react-native';

export default function NFluxo() {

    const { user, showFluxo, setShowFluxo, dataFluxo1, dataFluxo2 } = useContext(AuthContext);
    // Extração de dados resumos totais
    const [fluxoDataParcialNatur, setFluxoDataParcialNatur] = useState([]);
    const [fluxoDataTotalNatur, setFluxoDataTotalNatur] = useState([]);
    const [loading, setLoading] = useState(false);
    // Extração de dados
    
    useEffect(() => {
        async function getFluxoCaixaNatur() {
            setLoading(true);
            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 5,
                "fluxoDatini": moment(dataFluxo1).format('YYYYMMDD'),
                "fluxoDatfin": moment(dataFluxo2).format('YYYYMMDD')
            })
                .then((response) => {
                    setLoading(false);
                    setFluxoDataParcialNatur(response.data.bi054.bidata);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getFluxoCaixaNatur();
    },[]);

    useEffect(() => {
        async function getFluxoCaixaTotalNatur() {
            setLoading(true);
            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 99,
                "fluxoDatini": moment(dataFluxo1).format('YYYYMMDD'),
                "fluxoDatfin": moment(dataFluxo2).format('YYYYMMDD')
            })
                .then((response) => {
                    setLoading(false);
                    setFluxoDataTotalNatur(response.data.bi054.bidata);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getFluxoCaixaTotalNatur();
    }, []);

    return (
        <BoxHome>

            <HeaderPage
                startColor="#fcbc32"
                endColor="#F5AB00"
                textColor="#333"
                title="Naturovos"
                subTitle="Fluxo de Caixa"
                dtatu={fluxoDataParcialNatur.filter((d) => (d.nivel === 1)).map((a) => (a.atualizacao)).filter((x, i, a) => a.indexOf(x) == i)}
                bgStatus="#F5AB00"
                barStyle='dark'
            />

            <TabContainer>
                <CalendarRange color={"#555"} />
                <ContainerButtomFluxo bgcolor="#fff">

                    <LButtomFluxo
                        onPress={() => setShowFluxo(1)}
                        activeOpacity={showFluxo === 1 ? 1 : 0}
                        bgcolor={showFluxo === 1 ? '#F5AB00' : '#ddd'}
                    >
                        <LButtomFluxo.TextButtom color={showFluxo === 1 ? '#fff' : '#333'}>
                            Fluxo Natur
                        </LButtomFluxo.TextButtom>
                    </LButtomFluxo>
                    {user.lengthGrupo > 2 &&
                        <LButtomFluxo
                            onPress={() => setShowFluxo(2)}
                            activeOpacity={showFluxo === 2 ? 1 : 0}
                            bgcolor={showFluxo === 2 ? '#F5AB00' : '#ddd'}
                        >
                            <LButtomFluxo.TextButtom color={showFluxo === 2 ? '#fff' : '#333'}>
                                Fluxo Grupo
                            </LButtomFluxo.TextButtom>
                        </LButtomFluxo>
                    }
                </ContainerButtomFluxo>
                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    {showFluxo === 1 &&
                        <FluxoParcial fluxoparcial={fluxoDataParcialNatur} loading={loading} />
                    }
                    {showFluxo === 2 &&
                        <FluxoTotal fluxototal={fluxoDataTotalNatur} loading={loading} />
                    }
                </View>

            </TabContainer>

        </BoxHome>
    );
} 
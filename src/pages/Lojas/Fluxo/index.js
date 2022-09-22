import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { BoxHome, TabContainer } from '../../style';
import { AuthContext } from '../../../contexts/auth';
import FluxoParcial from './FluxoParcial';
import FluxoTotal from './FluxoTotal';
import { ContainerButtomFluxo, LButtomFluxo } from './style';
import { View } from 'react-native';
import HeaderPage from '../../../components/Header/Page';
import CalendarRange from '../../../components/CalendarRange';
import fluxo from '../../../services/fluxo';

export default function LFluxo({ }) {

    const { user, showFluxo, setShowFluxo, dataFluxo1, dataFluxo2 } = useContext(AuthContext);
    const [fluxoDataParcialLojas, setFluxoDataParcialLojas] = useState([]);
    const [fluxoDataTotalLojas, setFluxoDataTotalLojas] = useState([]);
    const [loading, setLoading ] = useState(false);
    // Extração de dados
   
    useEffect(() => {

        async function getFluxoCaixaLojas() {
            setLoading(true);
            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 1,
                "fluxoDatini": moment(dataFluxo1).format('YYYYMMDD'),
                "fluxoDatfin": moment(dataFluxo2).format('YYYYMMDD')
            })
                .then((response) => {
                    setTimeout(() => {
                        setFluxoDataParcialLojas(response.data.bi054.bidata);
                        setLoading(false);
                    }, 1000)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getFluxoCaixaLojas();
    }, []);
 
    useEffect(() => {

        async function getFluxoCaixaTotalLojas() {
            setLoading(true);
            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 99,
                "fluxoDatini": moment(dataFluxo1).format('YYYYMMDD'),
                "fluxoDatfin": moment(dataFluxo2).format('YYYYMMDD')
            })
                .then((response) => {
                    setTimeout(() => {
                        setFluxoDataTotalLojas(response.data.bi054.bidata);
                        setLoading(false);
                    }, 1000);
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getFluxoCaixaTotalLojas();
    }, []);

    return (
        <BoxHome>

            <HeaderPage
                startColor="#014D9B"
                endColor="#0A3B7E"
                textColor="#FFF"
                title="Lojas Solar"
                subTitle="Fluxo de Caixa"
                dtatu={fluxoDataParcialLojas.filter((d) => (d.nivel === 1)).map((a) => (a.atualizacao)).filter((x, i, a) => a.indexOf(x) == i)}
                bgStatus="#0A3B7E"
                barStyle='light'
            />
            <TabContainer>
                <CalendarRange color={"#555"} />
                <ContainerButtomFluxo bgcolor="#fff">

                    <LButtomFluxo
                        onPress={() => setShowFluxo(1)}
                        activeOpacity={showFluxo === 1 ? 1 : 0}
                        bgcolor={showFluxo === 1 ? '#29ABE2' : '#ddd'}
                    >
                        <LButtomFluxo.TextButtom color={showFluxo === 1 ? '#fff' : '#333'}>
                            Fluxo Lojas
                        </LButtomFluxo.TextButtom>
                    </LButtomFluxo>
                    {user.lengthGrupo > 2 &&
                        <LButtomFluxo
                            onPress={() => setShowFluxo(2)}
                            activeOpacity={showFluxo === 2 ? 1 : 0}
                            bgcolor={showFluxo === 2 ? '#29ABE2' : '#ddd'}
                        >
                            <LButtomFluxo.TextButtom color={showFluxo === 2 ? '#fff' : '#333'}>
                                Fluxo Grupo
                            </LButtomFluxo.TextButtom>
                        </LButtomFluxo>
                    }
                </ContainerButtomFluxo>
                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    {showFluxo === 1 &&
                        <FluxoParcial fluxoparcial={fluxoDataParcialLojas} loading={loading} />
                    }
                    {showFluxo === 2 &&
                        <FluxoTotal fluxototal={fluxoDataTotalLojas} loading={loading} />
                    }
                </View>

            </TabContainer>

        </BoxHome>
    );
} 
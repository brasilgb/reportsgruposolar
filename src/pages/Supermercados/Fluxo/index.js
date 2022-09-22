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

export default function NFluxo() {

    const { user, showFluxo, setShowFluxo, dataFluxo1, dataFluxo2 } = useContext(AuthContext);
    // Extração de dados resumos totais
    const [fluxoDataParcialSuper, setFluxoDataParcialSuper] = useState([]);
    const [fluxoDataTotalSuper, setFluxoDataTotalSuper] = useState([]);
    const [loading, setLoading] = useState(false);
    // Extração de dados

    useEffect(() => {
        async function getFluxoCaixaSuper() {
            setLoading(true);
            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 2,
                "fluxoDatini": moment(dataFluxo1).format('YYYYMMDD'),
                "fluxoDatfin": moment(dataFluxo2).format('YYYYMMDD')
            })
                .then((response) => {
                    setLoading(false);
                    setFluxoDataParcialSuper(response.data.bi054.bidata);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getFluxoCaixaSuper();
    }, []);

    useEffect(() => {
        async function getFluxoCaixaTotalSuper() {
            setLoading(true);
            await fluxo.post('http://comercial.gruposolar.com.br:8081/servicesgruposolar/servlet/isCobol/(FLUXO_DE_CAIXA)', {
                "fluxoTipreg": 1,
                "fluxoDepto": 99,
                "fluxoDatini": moment(dataFluxo1).format('YYYYMMDD'),
                "fluxoDatfin": moment(dataFluxo2).format('YYYYMMDD')
            })
                .then((response) => {
                    setLoading(false);
                    setFluxoDataTotalSuper(response.data.bi054.bidata);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getFluxoCaixaTotalSuper();
    }, []);

    return (
        <BoxHome>

            <HeaderPage
                startColor="#FF710F"
                endColor="#f26000"
                textColor="#FFF"
                title="Supermercados"
                subTitle="Fluxo de Caixa"
                dtatu={fluxoDataParcialSuper.filter((d) => (d.nivel === 1)).map((a) => (a.atualizacao)).filter((x, i, a) => a.indexOf(x) == i)}
                bgStatus="#f26000"
                barStyle="light"
            />

            <TabContainer>
                <CalendarRange color={"#555"} />
                <ContainerButtomFluxo bgcolor="#fff">

                    <LButtomFluxo
                        onPress={() => setShowFluxo(1)}
                        activeOpacity={showFluxo === 1 ? 1 : 0}
                        bgcolor={showFluxo === 1 ? '#f26000' : '#ddd'}
                    >
                        <LButtomFluxo.TextButtom color={showFluxo === 1 ? '#fff' : '#333'}>
                            Fluxo Super
                        </LButtomFluxo.TextButtom>
                    </LButtomFluxo>
                    {user.lengthGrupo > 2 &&
                        <LButtomFluxo
                            onPress={() => setShowFluxo(2)}
                            activeOpacity={showFluxo === 2 ? 1 : 0}
                            bgcolor={showFluxo === 2 ? '#f26000' : '#ddd'}
                        >
                            <LButtomFluxo.TextButtom color={showFluxo === 2 ? '#fff' : '#333'}>
                                Fluxo Grupo
                            </LButtomFluxo.TextButtom>
                        </LButtomFluxo>
                    }
                </ContainerButtomFluxo>
                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    {showFluxo === 1 &&
                        <FluxoParcial fluxoparcial={fluxoDataParcialSuper} loading={loading} />
                    }
                    {showFluxo === 2 &&
                        <FluxoTotal fluxototal={fluxoDataTotalSuper} loading={loading} />
                    }
                </View>

            </TabContainer>

        </BoxHome>
    );
} 
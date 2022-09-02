import moment from 'moment';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { BoxButtom, ButtomSetores } from '../../components/Buttons';
import HeaderHome from '../../components/Header/Home';
import Loading from '../../components/Loading';
import MoneyPTBR from '../../components/MoneyPTBR';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import { AreaUm, BoxHome, ButtonArea, ContainerText, GraphArea, ScreenArea } from '../style';

export default function Naturovos() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [totais, setTotais] = useState([]);

    useEffect(() => {
        async function getTotais() {
            setLoading(true);
            await api.get(`totais/${dtFormatada(dataFiltro)}`)
                .then((totais) => {
                    const tot = totais.data.filter((dep) => (dep.Departamento === 5));
                    setTotais(tot);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getTotais();
    }, [dataFiltro]);

    const colorValid = ((value) => {
        if (value <= 90) return "#DC2626";
        if (value <= 98) return "#F18800";
        if (value > 98) return "#10B981";
    });

    return (
        <Fragment>
            <View style={{
                ...Platform.select({
                    ios: {
                        height: 50,
                        backgroundColor: '#F5AB00'
                    },
                    android: {
                        height: 0,
                    }
                })
            }} />
            <BoxHome>
                <HeaderHome
                    startColor="#fcbc32"
                    endColor="#F5AB00"
                    textColor="#333"
                    bgStatus="#F5AB00"
                    barStyle="dark"
                    title="Naturovos"
                    subTitle="Resumo de Faturamento"
                    dtatu={moment(totais[0]?.Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
                />
                <ScreenArea>
                    {loading
                        ?
                        <Loading color="#F5AB00" />
                        :
                        <GraphArea>
                            <AreaUm height="70px" paddingTop="">
                                <ContainerText>
                                    <ContainerText.Title color="#0e98e5">Meta</ContainerText.Title>
                                    <ContainerText.Value color="#0e98e5"> <MoneyPTBR number={totais[0]?.Meta ? (totais[0]?.Meta) * 1 : 0} /> </ContainerText.Value>
                                </ContainerText>
                                <ContainerText>
                                    <ContainerText.Title color={colorValid(totais[0]?.MetaAlcancada * 100)}>Faturamento</ContainerText.Title>
                                    <ContainerText.Value color={colorValid(totais[0]?.MetaAlcancada * 100)}> <MoneyPTBR number={parseFloat(totais[0]?.Faturamento ? totais[0]?.Faturamento : 0)} /> </ContainerText.Value>
                                </ContainerText>
                            </AreaUm>

                            <AreaUm height="120px" paddingTop="10%">
                                <ContainerText>
                                    <ContainerText.Title color="#555" style={{ fontSize: 18 }}>Preço Médio</ContainerText.Title>
                                    <ContainerText.Value color="#555" style={{ fontSize: 40, fontWeight: 'bold' }}> <MoneyPTBR number={parseFloat(totais[0]?.PrecoMedio ? totais[0]?.PrecoMedio : 0)} /> </ContainerText.Value>
                                </ContainerText>

                            </AreaUm>

                            <AreaUm paddingTop="30%">

                                <CircularProgress
                                    value={totais[0]?.Margem ? (totais[0]?.Margem) * 100 : 0}
                                    radius={70}
                                    duration={2000}
                                    inActiveStrokeOpacity={0.4}
                                    progressValueColor={colorValid(totais[0]?.Margem)}
                                    activeStrokeColor={colorValid(totais[0]?.Margem)}
                                    activeStrokeWidth={10}
                                    inActiveStrokeWidth={10}
                                    maxValue={100}
                                    title={'Margem'}
                                    titleColor={colorValid(totais[0]?.Margem)}
                                    titleFontSize={12}
                                    progressValueFontSize={30}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
                                    valueSuffix={'%'}
                                />

                                <CircularProgress
                                    value={totais[0]?.Projecao ? (totais[0]?.Projecao) * 100 : 0}
                                    radius={70}
                                    duration={2000}
                                    inActiveStrokeOpacity={0.4}
                                    progressValueColor={colorValid(totais[0]?.Projecao)}
                                    activeStrokeColor={colorValid(totais[0]?.Projecao)}
                                    activeStrokeWidth={10}
                                    inActiveStrokeWidth={10}
                                    maxValue={100}
                                    title={'Projeção'}
                                    titleColor={colorValid(totais[0]?.Projecao)}
                                    titleFontSize={12}
                                    progressValueFontSize={30}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
                                    valueSuffix={'%'}
                                />

                            </AreaUm>
                        </GraphArea>
                    }
                    <ButtonArea>
                        <BoxButtom>

                            <ButtomSetores
                                startColor="#fcbc32"
                                endColor="#F5AB00"
                                textColor="#333"
                                icon="ios-list-sharp"
                                title="Resumo"
                                onPress="NResumo"
                            />

                            <ButtomSetores
                                startColor="#fcbc32"
                                endColor="#F5AB00"
                                textColor="#333"
                                icon="ios-logo-usd"
                                title="Faturamento"
                                onPress="NFaturamento"
                            />

                            <ButtomSetores
                                startColor="#fcbc32"
                                endColor="#F5AB00"
                                textColor="#333"
                                icon="md-cart-outline"
                                title="Compras"
                                onPress="NCompras"
                            />

                            <ButtomSetores
                                startColor="#fcbc32"
                                endColor="#F5AB00"
                                textColor="#333"
                                icon="md-analytics"
                                title="ADM Resumo"
                                onPress="NResumoFaturamento"
                            />

                        </BoxButtom>
                    </ButtonArea>
                </ScreenArea>
            </BoxHome>
        </Fragment>
    );
}
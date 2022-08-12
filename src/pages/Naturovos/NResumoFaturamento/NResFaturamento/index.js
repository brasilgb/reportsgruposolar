import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons';
import ResAssoc from '../../NResumoFaturamento/NResFaturamento/ResAssoc';
import MoneySemSimbolo from '../../../../components/MoneyPTBR/MoneySemSimbolo';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';
import Modals from '../../../../components/Modals';

export default function NResFaturamento() {
    const modalizeRef = useRef(null);

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [nResTotal, setNResTotal] = useState([]);
    const [nResGrupo, setNResGrupo] = useState([]);
    const [nResAssoc, setNResAssoc] = useState([]);

    const [grupoName, setGrupoName] = useState('');

    const openAssoc = () => {
        modalizeRef.current?.open();
    };

    const nameGrupo = (grupo) => {
        setGrupoName(grupo);
    };

    useEffect(() => {
        async function getNResGrupo() {
            setLoading(true);
            await api.get(`nresgrupo/${dtFormatada(dataFiltro)}`)
                .then(nresgrupo => {
                    setNResGrupo(nresgrupo.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNResGrupo();
    }, [dataFiltro]);

    useEffect(() => {
        async function getNResAssoc() {
            setLoading(true);
            await api.get(`nresassoc/${dtFormatada(dataFiltro)}`)
                .then(nresassoc => {
                    setNResAssoc(nresassoc.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNResAssoc();

        async function getNResTotal() {
            setLoading(true);
            await api.get(`nrestotais/${dtFormatada(dataFiltro)}`)
                .then(nrestotais => {
                    setNResTotal(nrestotais.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNResTotal();

    }, [dataFiltro]);

    return (
        <View style={styles.container}>
            {loading
                ?
                <Loading color="#F5AB00"/>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <DataTable>
                        {nResTotal.map((fat, index) => (
                            <DataTable.Header key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                <DataTable.Title style={styles.colgrandePrimary}>Grupo Pai</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotValorMesAtual}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotRepValorMesAnterior}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotRepValorAnoAnterior}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotQtdMesAtual}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotRepQtdMesAnterior}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotRepQtdAnoAnterior}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotPrecMedioMesAtual}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotRepPrecMedioMesAnterior}</DataTable.Title>
                                <DataTable.Title style={styles.colmedia}>{fat.RotPrecMedioAnoAnterior}</DataTable.Title>
                                <DataTable.Title style={styles.colgrande}>{fat.RotMargemAtual}</DataTable.Title>
                            </DataTable.Header>
                        ))}

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {nResTotal.map((fat, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.ValorMesAtual) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.ValRepValorMesAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.ValRepValorAnoAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}><MoneySemSimbolo number={fat.ValQtdMesAtual * 1} /></DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.ValRepQtdMesAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.ValRepQtdAnoAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}>{((fat.ValMargemAtual) * 100).toFixed(2)}%</DataTable.Cell>

                                </DataTable.Row>
                            ))}
                            {nResGrupo.sort((a, b) => (parseFloat(a.ValorMesAtual) < parseFloat(b.ValorMesAtual)) ? 1 : -1)
                                .map((fat, index) => (

                                    <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                        <DataTable.Cell style={styles.colgrandePrimary}>
                                            <TouchableOpacity onPress={() => { openAssoc(); nameGrupo(fat.Grupo) }} style={styles.btnModal}>
                                                <Icon style={{ marginRight: 2, paddingTop: 3 }} name="ios-arrow-redo" size={14} color="#333" />
                                                <Text style={{ color: '#333' }}>{fat.Grupo}</Text>
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.ValorMesAtual) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{((fat.RepValorMesAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{((fat.RepValorAnoAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneySemSimbolo number={((fat.QtdMesAtual) * 1)} />}</DataTable.Cell>

                                        <DataTable.Cell style={styles.colmedia}>{((fat.RepQtdMesAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{((fat.RepQtdAnoAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecMedioMesAtual) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.RepPrecMedioMesAnterior) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecMedioMesAtual) * 1)} />}</DataTable.Cell>
                                        {/* <DataTable.Cell style={styles.colmedia}>
                                        <Text
                                            style={((fat.RepAno) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepAno) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell> */}
                                        <DataTable.Cell style={styles.colgrande}>{((fat.RepMargemAtual) * 100).toFixed(2)}%</DataTable.Cell>

                                    </DataTable.Row>
                                ))}
                        </ScrollView>

                    </DataTable>
                </ScrollView>
            }

            <Modals
                modalizeRef={modalizeRef}
                title="Resumo por Associação"
            >
                <ResAssoc grupoName={grupoName} nResAssoc={nResAssoc} nResTotal={nResTotal} />

            </Modals>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrandePrimary: {
        width: 150,
        paddingHorizontal: 2,
        justifyContent: 'flex-start'
    },
    colgrande: {
        width: 150,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colmedia: {
        width: 120,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colpequena: {
        width: 80,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colmin: {
        width: 50,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'

    },
    btnModal: {
        width: 130,
        flexDirection: "row",
        backgroundColor: "#fcbc32",
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#F5AB00'
    }
});
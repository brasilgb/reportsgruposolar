import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';

import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function ResumoDiario() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [fatuTotLojas, setFatuTotLojas] = useState([]);
    const [fatuLojas, setFatuLojas] = useState([]);

    // Extração de dados resumos totais
    useEffect(() => {
        async function getFatuLojas() {
            setLoading(true);
            await api.get(`fatulojas/${dtFormatada(dataFiltro)}`)
                .then(fatulojas => {
                    setFatuLojas(fatulojas.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuLojas();
    }, [dataFiltro]);

    useEffect(() => {
        async function getFatuTotLojas() {
            setLoading(true);
            await api.get(`fatutotlojas/${dtFormatada(dataFiltro)}`)
                .then(fatutotlojas => {
                    setFatuTotLojas(fatutotlojas.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getFatuTotLojas();

    }, [dataFiltro]);

    return (
        <View style={styles.container}>
            {loading
                ?
                <Loading color="#0A3B7E" />
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <DataTable>
                        <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                            <DataTable.Title style={styles.colgrandePrimary}>Ass.</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Venda Dia {fatuTotLojas[0]?.DiaAtual}</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Venda dia  {fatuTotLojas[0]?.DiaAnterior}</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Venda Semana</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Venda Mês</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Jur.S/Parc.Mês</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
                        </DataTable.Header>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {fatuTotLojas.map((fat, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuDia) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemDia) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuAnterior) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuSemana) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemSemana) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuMes) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}></DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepFatu) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}></DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.JurosSPM) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepSemFatu) * 100).toFixed(2)}%</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                            {fatuLojas
                                .sort((a, b) => (parseFloat(a.FatuMes) < parseFloat(b.FatuMes)) ? 1 : -1)
                                .map((fat, index) => (
                                    <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                        <DataTable.Cell style={styles.colgrandePrimary}>{fat.Associacao}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuDia) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemDia) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuAnterior) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuSemana) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemSemana) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FatuMes) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>
                                            <Text
                                                style={((fat.CompDia) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                            >
                                                {((fat.CompDia) * 100).toFixed(2)}%
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.RepFatu) * 100).toFixed(2)}%</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>
                                            <Text
                                                style={((fat.CompMes) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                            >
                                                {((fat.CompMes) * 100).toFixed(2)}%
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.JurosSPM) * 1)} />}</DataTable.Cell>
                                        <DataTable.Cell style={styles.colpequena}>{((fat.RepSemFatu) * 100).toFixed(2)}%</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                        </ScrollView>

                    </DataTable>
                </ScrollView>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrandePrimary: {
        width: 60,
        paddingHorizontal: 2,
        justifyContent: 'flex-start'
    },
    colgrande: {
        width: 180,
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
    }
});
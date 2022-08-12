import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import Loading from '../../../../components/Loading';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';

export default function NCompDiario() {

    const { dtFormatada, dataFiltro } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [nComTipo, setNComTipo] = useState([]);
    const [nComTotal, setNComTotal] = useState([]);

    // Extração de dados resumos Faturamento e gráfico de evolução
    useEffect(() => {

        async function getNComTipo() {
            setLoading(true);
            await api.get(`ncomtipo/${dtFormatada(dataFiltro)}`)
                .then(ncomtipo => {
                    setNComTipo(ncomtipo.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNComTipo();
    }, [dataFiltro]);

    useEffect(() => {
        async function getNComTotal() {
            setLoading(true);
            await api.get(`ncomtotal/${dtFormatada(dataFiltro)}`)
                .then(ncomtotal => {
                    setNComTotal(ncomtotal.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getNComTotal();

    }, [dataFiltro]);

    return (
        <View style={styles.container}>
            {loading
                ?
                <Loading color="#F5AB00"/>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <DataTable>
                        <DataTable.Header style={{ backgroundColor: '#eee' }}>
                            <DataTable.Title style={styles.colgrandePrimary}>Tipo Prod.</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Compra dia {nComTotal[0]?.DiaAtual}</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Compra Semana</DataTable.Title>
                            <DataTable.Title style={styles.colmedia}>Compra Mês</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                        </DataTable.Header>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {nComTotal.map((tot, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>TOTAL</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComCompraDia) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComCompraSemana) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComCompraMes) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((tot.ComRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                            {nComTipo.map((fat, index) => (
                                <DataTable.Row key={index}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>{fat.MateriaPrima}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraDia) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraSemana) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraMes) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>
                                        <Text
                                            style={((fat.RepAno) * 100).toFixed() > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepAno) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>
                                        <Text
                                            style={((fat.PrecoMedio) * 100).toFixed() > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepPrecoMedio) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell>
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
        width: 100,
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
        width: 90,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    },
    colmin: {
        width: 50,
        paddingHorizontal: 2,
        justifyContent: 'flex-end'
    }
});
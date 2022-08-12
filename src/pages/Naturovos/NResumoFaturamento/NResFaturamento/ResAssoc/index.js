import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';
import { ScrollView } from 'react-native-gesture-handler';
import MoneySemSimbolo from '../../../../../components/MoneyPTBR/MoneySemSimbolo';

export default function nResAssoc({ grupoName, nResAssoc, nResTotal }) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    {nResTotal.map((fat, index) => (
                        <DataTable.Header key={index} style={{ backgroundColor: '#E5E5EA' }}>
                            <DataTable.Title style={styles.colgrandePrimary}>Associação</DataTable.Title>
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

                        {nResAssoc.filter((filg) => (filg.GrupoPai === grupoName))
                            .sort((a, b) => (a.Associacao > b.Associacao) ? 1 : -1)
                            .map((fat, index) => (

                                <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>{fat.Associacao}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.ValorMesAtual) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.RepValorMesAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.RepValorAnoAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneySemSimbolo number={((fat.QtdMesAtual) * 1)} />}</DataTable.Cell>

                                    <DataTable.Cell style={styles.colmedia}>{((fat.RepQtdMesAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{((fat.RepQtdAnoAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecMedioMesAtual) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.RepPrecMedioMesAnterior) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.RepPrecMedioAnoAnterior) * 1)} />}</DataTable.Cell>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    colgrandePrimary: {
        width: 120,
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
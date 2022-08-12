import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../../components/MoneyPTBR';

export default function ResAssoc({ grupoName, nfatuPerfAssoc }) {
 
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                    <DataTable.Title style={styles.colgrandePrimary}>Assoc.</DataTable.Title>
                        <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Preço Méd. Kg/Liq</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Fatu. + EC</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep. + EC</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem + EC</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {nfatuPerfAssoc.filter((filg) => (filg.Grupo === grupoName))
                            .sort((a, b) => (parseFloat(a.Faturamento) < parseFloat(b.Faturamento)) ? 1 : -1)
                            .map((fat, index) => (

                                <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                    <DataTable.Cell style={styles.colgrandePrimary}>
                                            <Text>{fat.Associacao}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.Faturamento) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecoMedioKg) * 1)} />}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.FaturamentoEC) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepEC) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemEC) * 100).toFixed(2)}%</DataTable.Cell>

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
        width: 50,
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